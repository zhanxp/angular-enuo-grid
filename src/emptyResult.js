angular.module('enuo.grid')
    .directive('emptyResult', function() {
        return {
            restrict: 'EA',
            scope: {
                height: '@',
                emTitle: '@',
                emIntro: '@',
                emIcon: '@',
                emStyle: '@'
            },
            replace: true,
            templateUrl: 'enuo/grid/templates/emptyResult.html',
            controller: function($scope, $element, $attrs) {
                $scope.$watchGroup(['height', 'emTitle', 'emIntro', 'emIcon', 'emStyle'],
                    function(newVal, oldVal) {
                        $scope.fnUpdate();
                    }, true);

                $scope.fnUpdate = function() {
                    $scope.config = {
                        title: $scope.emTitle || '没有匹配的数据',
                        icon: $scope.emIcon || 'glyphicon glyphicon-info-sign text-yellow',
                        intro: $scope.emIntro || '请尝试修改查询条件后再试一次。',
                    };

                    if ($scope.emStyle == 'loading') {
                        $scope.config.title = "loading";
                        $scope.config.intro = "正在加载,请稍后...";
                        $scope.config.icon = "fa fa-refresh fa-spin text-muted";
                    }

                    var height = $scope.height || 200;
                    var top = (height - 60) / 2;
                    $scope.outStyle = {
                        'min-height': height + 'px'
                    };
                    $scope.innerStyle = {
                        'margin-top': top + 'px'
                    };
                };
            }
        };
    });