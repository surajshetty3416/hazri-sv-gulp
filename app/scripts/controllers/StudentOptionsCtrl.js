'use strict';

angular.module('HazriSV')


    .controller('StudentOptionsCtrl', function ($scope, $ionicActionSheet, $ionicModal, $ionicLoading,FirebaseSVRef, SVUrl, $localstorage) {
        $scope.showTimeTable = function () {
            $ionicLoading.show();
            $scope.ttImage = {};
            FirebaseSVRef.child('timetables').orderByChild('dept').equalTo($localstorage.get('dept')).once('value', function (snapshot) {
               //console.log(snapshot.val());
                if (snapshot.exists()) {
                    var timetables = snapshot.val();
                    //console.log(timetables.year);
                    for (var t in timetables) {
                        if (timetables[t].year === $localstorage.get('year') && timetables[t].sem === $localstorage.get('sem')) {
                            //console.log('in');
                            $scope.ttImage = {
                                time: timetables[t].timestamp,
                                src: timetables[t].img
                            };
                            $scope.$apply();
                            break;
                        }
                    }
                   // console.log($scope.ttImage)
                    $ionicLoading.hide();
                    $scope.modal.show();
                }
                else{
                    $ionicLoading.hide();
                    $scope.modal.show();
                }

            });


        };

            $ionicModal.fromTemplateUrl('templates/timetableModal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
                console.log('destroyed');
            });



    });
