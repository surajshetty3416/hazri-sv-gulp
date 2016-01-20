'use strict';

angular.module('HazriSV')

    .controller('NameListCtrl', function ($scope, $rootScope, $ionicLoading, $localstorage, FirebaseRef) {
        $scope.nameoption = [];
        $scope.nameoption = [];
        $ionicLoading.show();
        if ($rootScope.isOnline) {
            FirebaseRef.child('/students/' + $localstorage.get('dept')).on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var data = childSnapshot.val();
                    var key = childSnapshot.key();
                    if (data.year === $localstorage.get('year')) {
                        $scope.nameoption.push({ name: data.name, rollno: data.rollno, uid: key, gender: data.gender });
                    }
                });
                $ionicLoading.hide();
            });
        }
        else {
            console.log("You are Offline!!!!");
        }
        $scope.setroll = function (roll, uid) {
            $localstorage.set('rollno', roll);
            $localstorage.set('uid', uid.toUpperCase());
        };

    });
