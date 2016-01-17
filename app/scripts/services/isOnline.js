'use strict';


angular.module('HazriSV')

    .factory('isOnline', function ($ionicPlatform,$cordovaNetwork) {

        var isOnline = function () {
            $ionicPlatform.ready(function () {
                if (window.cordova) {
                    return $cordovaNetwork.isOnline();
                }
                else
                    return true;
            });
        };

        return isOnline;

    });
