angular.module('enuo.grid')
    .directive('enuoGridCell', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                column: "=",
                item: "="
            },
            template: '<span ng-click="click()"></span>',
            compile: function() {
                return {
                    pre: function($scope, $elm, $attrs) {
                        function getFunc(func) {
                            if (angular.isFunction(func)) {
                                return func;
                            }
                            return eval("(" + func + ")");
                        }

                        var value = $scope.item[$scope.column.key];
                        if ($scope.column.format) {
                            value = getFunc($scope.column.format)(value, $scope.item);
                        } else if (value === undefined) {
                            value = $scope.column.name;
                        } else if (value === null) {
                            value = '';
                        }

                        if ($scope.column.template == 'add') {
                            $elm.append("<a class='text-success text-link'><i class='glyphicon glyphicon-plus'></i> " + value + "</a>");
                        } else if ($scope.column.template == 'edit') {
                            $elm.append("<a class='text-primary text-link'><i class='glyphicon glyphicon-pencil'></i> " + value + "</a>");
                        } else if ($scope.column.template == 'delete') {
                            $elm.append("<a class='text-danger text-link'><i class='glyphicon glyphicon-remove'></i> " + value + "</a>");
                        } else if ($scope.column.template) {
                            $elm.append(getFunc($scope.column.template)(value, $scope.item));
                        } else {
                            $elm.append(value + '');
                        }
                    },
                    post: function($scope, $elm, $attrs) {
                        $scope.click = function() {
                            if ($scope.column.click) {
                                var invoke;
                                if (angular.isFunction($scope.column.click)) {
                                    invoke = $scope.column.click;
                                } else {
                                    invoke = eval("(" + $scope.column.click + ")");
                                }
                                invoke($scope.item[$scope.column.name], $scope.item);
                            }
                        }
                    }
                }
            }
        }
    });