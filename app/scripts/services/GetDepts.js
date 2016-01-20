'use strict';

angular.module('HazriSV')
    .factory('GetDepts', function (FirebaseRef, $rootScope, $localstorage, $q, $timeout) {

        var defer = $q.defer();
        var deptoption = [];
        if (angular.equals($localstorage.getObj('deptoption'), {})) {
            // console.log('in');
            if ($rootScope.isOnline()) {
                $timeout(function () {
                    defer.reject();
                }, 45000);
                FirebaseRef.child('departments').on('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var id = childSnapshot.key();
                        var data = childSnapshot.val();
                        deptoption.push({ 'name': data.name, 'id': id });
                    });
                    $localstorage.setObj('deptoption', deptoption);
                    defer.resolve(deptoption);
                }, function (error) {
                    defer.reject();
                });
            }
            else {
                defer.reject();
            }
        }
        else {
            deptoption = $localstorage.getObj('deptoption');
            defer.resolve(deptoption);
        }
        return defer.promise;
    });

