'use strict';

angular.module('HazriSV')

    .controller('TopicDetailsCtrl', function ($scope, $localstorage, $ionicLoading, FirebaseRef) {
        console.log('in');
        $scope.sub = $localstorage.getObj('sub');
        $scope.sub.batch = $localstorage.get('bat');
        $scope.topics = [];
        $scope.limit = 50;
        $ionicLoading.show();

        FirebaseRef.child('attendances/' + $localstorage.get('dept')).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                if (data.year == $localstorage.get('year') && data.semester == $localstorage.get('sem') && data.subid == $scope.sub.id && data.type == $scope.sub.type) {
                    if (data.type == 'th') {
                        $scope.topics.push({ content: data.topic, date: data.date });
                    }
                    if (data.type == 'pr') {
                        if (data.batchno == $scope.sub.batch) {
                            $scope.topics.push({ content: data.topic, date: data.date });
                        }
                    }
                }

            });
            $ionicLoading.hide();
        });
    });
