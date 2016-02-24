'use strict';

angular.module('HazriSV')

    .controller('SideMenuCtrl', function ($scope, FirebaseSVRef) {

      $scope.loading = true;
      FirebaseSVRef.child('fests/festList').once('value')
        .then(function (snap) {
          $scope.fests = snap.val();
          $scope.loading = false;
          $scope.$apply();
        })


    });
