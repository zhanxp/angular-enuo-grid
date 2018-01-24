angular.module('enuo.grid')
    .directive("enuoGrid", function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=',
                gridSource: '='
            },
            templateUrl: "enuo/grid/templates/enuoGrid.html",
            controller: function($scope, $element, $attrs) {
                //$scope.selectedList = [];
                $scope.config.selectedList = $scope.config.selectedList || [];
                $scope.checkAll = false;
                $scope.columnsCount = $scope.config.pkid ? $scope.config.columns.length + 1 : $scope.config.columns.length;
                $scope.contentStyle = $scope.config.style ? $scope.config.style.contentStyle : {};

                $scope.fnItemChecked = function(item) {
                    var value = item[$scope.config.pkid];
                    return $scope.config.selectedList.filter(function(data) {
                        return data[$scope.config.pkid] == value;
                    }).length > 0;
                };

                $scope.fnCheckIsAll = function() {
                    if (!$scope.gridSource) {
                        return false;
                    }

                    var checkCount = $scope.gridSource.filter(function(data) {
                        return $scope.fnItemChecked(data);
                    }).length;
                    $scope.checkAll = checkCount == $scope.gridSource.length;
                }

                $scope.fnCheckItem = function(item) {
                    var value = item[$scope.config.pkid];
                    var selecteds = $scope.config.selectedList.filter(function(data) {
                        return data[$scope.config.pkid] == value;
                    });
                    var selected = selecteds.length > 0 ? selecteds[0] : null;
                    if (selected) {
                        var index = $scope.config.selectedList.indexOf(selected);
                        $scope.config.selectedList.splice(index, 1);
                    } else {
                        $scope.config.selectedList.push(item);
                    }
                    $scope.fnCheckIsAll();
                };

                $scope.fnCheckAll = function() {
                    $scope.checkAll = !$scope.checkAll;
                    angular.forEach($scope.gridSource, function(data, index, array) {
                        var value = data[$scope.config.pkid];
                        var selecteds = $scope.config.selectedList.filter(function(item) {
                            return item[$scope.config.pkid] == value;
                        });
                        var selected = selecteds.length > 0 ? selecteds[0] : null;
                        if ($scope.checkAll && !selected) {
                            $scope.config.selectedList.push(data);
                        }
                        if (!$scope.checkAll && selected) {
                            var index = $scope.config.selectedList.indexOf(selected);
                            $scope.config.selectedList.splice(index, 1);
                        }
                    });
                    return false;
                };

                $scope.$watch("gridSource", function(newVal, oldVal) {
                    // $scope.checkAll = false;
                    // $scope.selectedList = [];
                    $scope.fnCheckIsAll();
                }, true);

                $scope.fnSelectQuery = function(option, item) {
                    item.value = option.value;
                    item.display = option.display || option.name;
                };

                $scope.fnQuery = function() {
                    var query = {};
                    angular.forEach($scope.config.query.items, function(data, index, array) {
                        query[data.key] = data.value;
                    });
                    $scope.config.query.action.callback(query);
                };
            }
        }
    });