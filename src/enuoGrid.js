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
                $scope.selectedList = [];
                $scope.checkAll = false;
                $scope.fnItemChecked = function(item) {
                    var value = item[$scope.config.pkid];
                    return $scope.selectedList.indexOf(value) > -1;
                };
                $scope.fnCheckItem = function(item) {
                    var value = item[$scope.config.pkid];
                    var index = $scope.selectedList.indexOf(value);
                    if (index > -1) {
                        $scope.selectedList.splice(index, 1);
                    } else {
                        $scope.selectedList.push(value);
                    }
                    $scope.checkAll = ($scope.selectedList.length == $scope.gridSource.length);
                };
                $scope.fnCheckAll = function() {
                    var newArr = [];
                    if ($scope.checkAll) {
                        angular.forEach($scope.gridSource, function(data, index, array) {
                            newArr.push(data[$scope.config.pkid]);
                        });
                    }
                    $scope.selectedList = newArr;
                };
                $scope.$watch("gridSource", function(newVal, oldVal) {
                    $scope.checkAll = false;
                    $scope.selectedList = [];
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