'use strict';

angular.module('HazriSV')
    .filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        };
    });
