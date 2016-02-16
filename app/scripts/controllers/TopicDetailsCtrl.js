'use strict';

angular.module('HazriSV')

    .controller('TopicDetailsCtrl', function ($scope, $localstorage, $ionicLoading, FirebaseRef, $cordovaVibration) {
        console.log('in');
        $scope.sub = $localstorage.getObj('sub');
        $scope.sub.batch = $localstorage.get('bat');
        $scope.topics = [];
        $scope.limit = 50;
        $ionicLoading.show();
        $scope.googleIt = function(textToGoogle){
            $cordovaVibration.vibrate(50);
            cordova.InAppBrowser.open('http://www.google.com/search?ie=UTF-8&q='+encodeURIComponent(textToGoogle), '_system', 'location=yes');
            console.log('Navigated to http://www.google.com/search?ie=UTF-8&q='+encodeURIComponent(textToGoogle));
        };
        FirebaseRef.child('attendances/' + $localstorage.get('dept')).orderByChild('subid').equalTo($scope.sub.id).once('value', function (snapshot) {
            if ($scope.sub.type == "th") {
                snapshot.forEach(function (childSnapshot) {
                    var data = childSnapshot.val();
                    if (data.type == "th") {
                        $scope.topics.push({ content: data.topic, date: data.date });
                    }
                });
            }
            if ($scope.sub.type == "pr") {
                snapshot.forEach(function (childSnapshot) {
                    var data = childSnapshot.val();
                    if (data.type == "pr") {
                        if (data.batchno == $scope.sub.batch) {
                            $scope.topics.push({ content: data.topic, date: data.date });
                        }
                    }
                });
            }
            $ionicLoading.hide();
        });
    });
