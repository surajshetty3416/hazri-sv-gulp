'use strict';


angular.module('HazriSV')

.factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObj: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObj: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            clear: function (key) {
                $window.localStorage[key] = null;
            },
            clearObj: function (key) {
                $window.localStorage[key] = JSON.stringify({});
            },
             pushObj: function (key,value) {
                 var data=JSON.parse($window.localStorage[key] || '{}');
                 data[Object.keys(data).length]=value; 
                $window.localStorage[key] = JSON.stringify(data);
            },
            clearAll:function () {
                $window.localStorage.clear();
            }
        };
    }]);