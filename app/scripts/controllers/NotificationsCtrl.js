'use strict';

angular.module('HazriSV')

    .controller('NotificationsCtrl', function ($scope, $timeout, $localstorage) {

        Object.keys($localstorage.getObj('unreadnoti')).forEach(function (key) {
            $localstorage.pushObj('readnoti', $localstorage.getObj('unreadnoti')[key]);
        });

        $localstorage.clearObj('unreadnoti');
        $scope.limit = 2;
        $scope.canload = true;
        $scope.items = Object.keys($localstorage.getObj('readnoti')).map(function (key) { return $localstorage.getObj('readnoti')[key]; });
        $scope.loadolder = function () {
            if ($scope.items.length > $scope.limit)
            { $scope.limit += 2; }
            else
            { $scope.canload = false; }
        };
        $scope.doRefresh = function () {
            $timeout(function () {
                $scope.limit = 2;
                $scope.canload = true;
                $scope.items = $localstorage.getObj('readnoti');
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);

        };

    });
