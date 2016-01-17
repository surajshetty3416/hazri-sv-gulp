'use strict';

angular.module('HazriSV')

    .controller('OptionsCtrl', function ($scope, $timeout, $localstorage) {
        $scope.noti=Object.keys($localstorage.getObj("unreadnoti"));
    });