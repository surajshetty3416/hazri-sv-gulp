'use strict';

angular.module('HazriSV')
    .factory('FirebaseRef', function (FirebaseUrl) {
        var ref = new Firebase(FirebaseUrl);
        return ref;
    });