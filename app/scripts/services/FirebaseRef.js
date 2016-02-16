'use strict';

angular.module('HazriSV')
    .factory('FirebaseRef', function (FirebaseUrl) {
        var ref = new Firebase(FirebaseUrl);
        return ref;
    })
    .factory('FirebaseSVRef', function (SVUrl) {
        var ref = new Firebase(SVUrl);
        return ref;
    });