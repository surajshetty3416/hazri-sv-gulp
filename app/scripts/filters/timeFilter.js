'use strict';

angular.module('HazriSV')
    .filter('timeFilter', function () {
        return function (time) {
            var filtered = time+" AM";
            var timeParts = time.split(':');
            if(parseInt(timeParts[0]) > 12)
              filtered = timeParts[0] - 12 +":"+ timeParts[1] + " PM";
            return filtered;
        };
    });
