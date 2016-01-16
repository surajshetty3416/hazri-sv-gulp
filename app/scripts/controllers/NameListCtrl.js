'use strict';

angular.module('HazriSV')

.controller('NameListCtrl', function($scope,$ionicLoading,$localstorage,FirebaseRef) {
          $scope.nameoption = [];
        $ionicLoading.show();
        $scope.nameoption = [];
        
        FirebaseRef.child('/students/' + $localstorage.get('dept')).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                var key = childSnapshot.key();
                if (data.year === $localstorage.get('year')) {
                    $scope.nameoption.push({ name: data.name, rollno: data.rollno , uid:key,gender: data.gender});
                }
            });
            $ionicLoading.hide();
        });

        $scope.setroll = function (roll,uid) {
            $localstorage.set('rollno', roll);
            $localstorage.set('uid', uid.toUpperCase());
        };

  });
