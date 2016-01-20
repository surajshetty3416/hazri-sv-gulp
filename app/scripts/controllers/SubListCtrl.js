'use strict';

angular.module('HazriSV')

    .controller('SubListCtrl', function ($scope, $localstorage, $ionicLoading, FirebaseRef) {
        $scope.suboption = [];
        $scope.nameoption = [];
        $ionicLoading.show();
        FirebaseRef.child('/subjects/' + $localstorage.get('dept')).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key();
                var data = childSnapshot.val();
                if (data.year === $localstorage.get('year') && data.sem === $localstorage.get('sem')) {
                    $scope.suboption.push({ name: data.fullname, subid: key, theory: data.theory, practical: data.practical });
                }
            });
            $ionicLoading.hide();
        });

        $scope.settsub = function (sub) {
            $localstorage.setObj('sub', { 'name': sub.name, 'type': 'th', 'id': sub.subid });
        };
        $scope.setpsub = function (sub) {
            $localstorage.setObj('sub', { 'name': sub.name, 'type': 'pr', 'id': sub.subid });
        };

    });
