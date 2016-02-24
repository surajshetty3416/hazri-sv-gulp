'use strict';

angular.module('HazriSV')

    .controller('FestCtrl', function ($scope, $stateParams, FirebaseSVRef, $ionicLoading) {

      $ionicLoading.show();
      var fest = $stateParams.name;
      $scope.festName = fest;
      FirebaseSVRef.child('fests').orderByChild('festName').equalTo(fest).once('value')
        .then(function (snap) {
          console.log(snap.val());
          $scope.events = snap.val();
          $scope.$apply('events');
          $ionicLoading.hide();
        });

      $scope.isNumber = function (n) {
        return !isNaN(n);
      }

    });
