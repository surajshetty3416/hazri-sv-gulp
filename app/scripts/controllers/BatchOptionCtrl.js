'use strict';

angular.module('HazriSV')

    .controller('BatchOptionCtrl', function ($scope, $ionicLoading, $localstorage, FirebaseRef) {
        $scope.batoption = [];
        $ionicLoading.show();
        FirebaseRef.child('studentCount/' + $localstorage.get("dept")).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                if (data.year === $localstorage.get('year')) {
                    $scope.batoption = data.batchno;
                }
            });
            $ionicLoading.hide();
        });

        $scope.setbat = function (bat) {
            $localstorage.set('bat', bat);
        };
    });
