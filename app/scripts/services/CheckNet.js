'use strict';

angular.module('HazriSV')

    .factory('checknet', ['$timeout', function ($timeout) {
        return {
            isOnline: function () {
                var xhr = new XMLHttpRequest();
                var file = "https://hazritest.firebaseio.com/test";
                var randomNum = Math.round(Math.random() * 10000);
                xhr.timeout = 5000;
                xhr.ontimeout = function () {
                    console.log('timeout');
                    return false;
                };

                xhr.open('GET', file + "?rand=" + randomNum, true);

                try {
                    // $timeout(function(){xhr.send();},3000);
                    xhr.send();
                    if (xhr.status >= 200 && xhr.status < 304) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            }
        }

    }]);
            
        