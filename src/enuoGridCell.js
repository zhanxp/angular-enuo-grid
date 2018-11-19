angular.module('enuo.grid')
    .directive('enuoGridCell', function($sce) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                column: "=",
                item: "=",
                index: "=",
                row: "="
            },
            template: '<span ng-click="click($event)" bind-html-compile="content"></span>',
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
                        $scope.value = value;

                        var content = value;
                        if ($scope.column.format) {
                            content = getFunc($scope.column.format)(value, $scope.item);
                        } else if (value === undefined) {
                            content = $scope.column.name;
                        } else if (value === null) {
                            content = '';
                        }

                        if ($scope.column.template == 'add') {
                            content = "<a class='text-success text-link'><i class='glyphicon glyphicon-plus'></i> " + $scope.column.name + "</a>";
                        } else if ($scope.column.template == 'edit') {
                            content = "<a class='text-primary text-link'><i class='glyphicon glyphicon-pencil'></i> " + $scope.column.name + "</a>";
                        } else if ($scope.column.template == 'delete') {
                            content = "<a class='text-danger text-link'><i class='glyphicon glyphicon-remove'></i> " + $scope.column.name + "</a>";
                        } else if ($scope.column.template) {
                            content = getFunc($scope.column.template)(value, $scope.item);
                        } else {

                        }

                        $scope.content = content;
                    },
                    post: function($scope, $elm, $attrs) {
                        $scope.click = function($event, index) {
                            index = index || 0;
                            if ($scope.column.click) {
                                var invoke;
                                if (angular.isFunction($scope.column.click)) {
                                    invoke = $scope.column.click;
                                } else {
                                    invoke = eval("(" + $scope.column.click + ")");
                                }
                                invoke($scope.item[$scope.column.name], $scope.item, $event, index);
                            }
                            $event.stopPropagation();
                        }
                    }
                }
            }
        }
    });