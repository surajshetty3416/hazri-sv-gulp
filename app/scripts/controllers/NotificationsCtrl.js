'use strict';

angular.module('HazriSV')

    .controller('NotificationsCtrl', function ($scope, $timeout, $localstorage, $rootScope, alertPopup, $ionicPopup) {


        $scope.newNotification = Object.keys($localstorage.getObj('unreadnoti')).map(function (key) { return $localstorage.getObj('unreadnoti')[key]; });
        $scope.readNotification = Object.keys($localstorage.getObj('readnoti')).map(function (key) { return $localstorage.getObj('readnoti')[key]; });

        $scope.$on('$ionicView.beforeLeave', function () {
            Object.keys($localstorage.getObj('unreadnoti')).forEach(function (key) {
                $localstorage.pushObj('readnoti', $localstorage.getObj('unreadnoti')[key]);
            });
            $localstorage.clearObj('unreadnoti');
            $localstorage.set('notificationCounter', 0);
            $rootScope.$broadcast('ReadNotification');
        });
        $scope.clear = function () {
            $ionicPopup.confirm({
                title: 'Delete Notification',
                template: 'Are you sure you want to Delete all Notifications?'
            }).then(function (res) {
                if (res) {
                    $localstorage.clearObj('readnoti');
                    $localstorage.clearObj('unreadnoti');
                    $scope.newNotification = Object.keys($localstorage.getObj('unreadnoti')).map(function (key) { return $localstorage.getObj('unreadnoti')[key]; });
                    $scope.readNotification = Object.keys($localstorage.getObj('readnoti')).map(function (key) { return $localstorage.getObj('readnoti')[key]; });
                    alertPopup('All Notifications Cleared', 'balanced');
                } else {
                    console.log('Cancel');
                }
            });
           
            //$scope.$apply();
        };
    });
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        
       