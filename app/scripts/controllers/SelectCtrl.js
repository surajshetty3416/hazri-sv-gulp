'use strict';

angular.module('HazriSV')

    .controller('SelectCtrl', function ($scope, $ionicLoading, $localstorage, $ionicPopup, FirebaseRef, GetDepts, $state) {
        $scope.detail = {
            dept: null,
            year: null,
            rollno: null,
            sem: null,
            deptoption: [],
            semoption: [],
            uid: null
        };

        GetDepts.then(function (val) {
            //  $ionicLoading.hide();
            $scope.detail.deptoption = val;

        });

        $scope.noti = Object.keys($localstorage.getObj('unreadnoti'));
        //.map(function (key) {return $localstorage.getObj('unreadnoti')[key]});

        $scope.reset = function () {
            $scope.detail.year = null;
            $scope.detail.sem = null;
        };

        $scope.providesemop = function () {
            if ($scope.detail.year === 'fe') {
                $scope.detail.semoption = [{ id: '1', name: 'Semester 1' }, { id: '2', name: 'Semester 2' }];
            }
            if ($scope.detail.year === 'se') {
                $scope.detail.semoption = [{ id: '3', name: 'Semester 3' }, { id: '4', name: 'Semester 4' }];
            }
            if ($scope.detail.year === 'te') {
                $scope.detail.semoption = [{ id: '5', name: 'Semester 5' }, { id: '6', name: 'Semester 6' }];
            }
            if ($scope.detail.year === 'be') {
                $scope.detail.semoption = [{ id: '7', name: 'Semester 7' }, { id: '8', name: 'Semester 8' }];
            }
        };

        $scope.setdata = function () {
            $localstorage.set('dept', $scope.detail.dept);
            $localstorage.set('year', $scope.detail.year);
            $localstorage.set('sem', $scope.detail.sem);
            $state.go('studentOptions');
        };

        $scope.direct = function () {
            var checkuid = function () {
                var match = false;
                FirebaseRef.child('students').on('value', function (snapshot) {
                    snapshot.forEach(function (depts) {
                        depts.forEach(function (uid) {
                            if ($scope.detail.uid.toUpperCase() === uid.key()) {
                                match = true;
                                $localstorage.set('dept', depts.key());
                                $localstorage.set('year', uid.val().year);
                                $localstorage.set('sem', uid.val().year == 'be' ? '8' : uid.val().year == 'te' ? '6' : uid.val().year == 'se' ? '4' : '2');
                                $localstorage.set('rollno', uid.val().rollno);
                                $localstorage.set('uid', $scope.detail.uid.toUpperCase());
                            }
                        });
                    });
                    if (match)
                        $state.go('attDetails');
                    else {
                        $ionicPopup.alert({
                            title: "INVALID UID",
                            // template: 'Please check UniqueID printed on CollegeID card ',
                            okType: "button-assertive"
                        }).then(function () {
                            //$state.go('select');
                        });
                    }
                });
            };
            checkuid();
        }
    });