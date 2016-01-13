'use strict';
angular.module('HazriSV')

    .controller('SelectCtrl', function ($scope, $ionicLoading, $localstorage, checknet, $ionicPopup, FirebaseRef, deptoption,$state) {

        // var push = new Ionic.Push({
        //     'onNotification': function (notification) {
        //         $localstorage.pushObj('unreadnoti', { 'title': notification.title, 'message': notification.text, 'date': Date() });
        //     },
        //     'pluginConfig': {
        //         'android': {
        //         }
        //     }
        // });
        //push.register();
        //console.log(checknet.isOnline());
        
        $scope.detail.deptoption = deptoption;
        
        $scope.detail = {
            dept: null,
            year: null,
            rollno: null,
            sem: null,
            deptoption: [],
            semoption: [],
            uid:null
        };

        $scope.noti = Object.keys($localstorage.getObj('unreadnoti'));//.map(function (key) {return $localstorage.getObj('unreadnoti')[key]});
        console.log($scope.noti);



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
            
            $state.go('studentOption');

                // var user = Ionic.User.current();
                // if (!user.id) {
                //     user.id = Ionic.User.anonymousId();
                // }

                // user.set('Department', $localstorage.get('dept'));
                // user.set('Year', $localstorage.get('year'));
                // user.save();

                // var callback = function () {
                //     push.addTokenToUser(user);
                //     user.save();
                // };
                // push.register(callback);
        };
        $scope.direct = function () {
            $localstorage.set('uid', $scope.detail.uid.toUpperCase());
            $state.go('attDetails');
        };        

    });