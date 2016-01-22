'use strict';

angular.module('HazriSV')
    .factory('alertPopup', function ($ionicPopup) {
        return function (message, color) {
            $ionicPopup.alert({
                title: message,
                okText: 'OK',
                okType: 'button-' + color
            });
        }
    })