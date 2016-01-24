'use strict';

angular.module('HazriSV')

    .controller('ReportBugCtrl', function ($scope, SVUrl, $ionicLoading) {

      $scope.user = {};
      $scope.send = function (user) {
        $ionicLoading.show();
        var ref = new Firebase(SVUrl);
        ref.child('bugs').push(user, function (err) {
          $ionicLoading.hide();
          $scope.user = {}
        })
      }

    });
