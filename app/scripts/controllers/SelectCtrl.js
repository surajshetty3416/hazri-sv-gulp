'use strict';

angular.module('HazriSV')

    .controller('SelectCtrl', function ($scope, $ionicModal, alertPopup, $rootScope, $ionicPopover, $ionicLoading,
        $localstorage, $ionicPopup, FirebaseRef, GetDepts, $state, $ionicPlatform, $cordovaNetwork) {

        $scope.detail = {
            dept: null,
            year: null,
            rollno: null,
            sem: null,
            uid: null
        };
        $scope.deptOptions = {};
        $scope.yearOptions = {};
        $scope.semOptions = {};
        $scope.notificationNum = $localstorage.get('notificationCounter', 0);

        $ionicPlatform.ready(function () {
            /*Online check*/
            if (window.cordova) {
                $scope.isOnline = $cordovaNetwork.isOnline();
                $scope.$apply();
            }
            else {
                $scope.isOnline = true;
            }

            $scope.$on('$cordovaNetwork:online', function (event, networkState) {
                $scope.isOnline = true;
                $scope.$apply();
                console.log('online');
            });

            // listen for Offline event
            $scope.$on('$cordovaNetwork:offline', function (event, networkState) {
                $scope.isOnline = false;
                $scope.$apply();
                console.log('offline');
            });

        });

        //Registration Modal
        $ionicModal.fromTemplateUrl('templates/RegisterForNotification.html', {
            scope: $scope,
            animation: 'fade-in-scale'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        //Options Popover
        $ionicPopover.fromTemplateUrl('templates/Options.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.popover = popover;
        });


        GetDepts.then(function (val) {
            $scope.deptOptions = val.deptOptions;
            $scope.yearOptions = val.yearOptions;
            $scope.semOptions = val.semOptions;
            console.log(val);
        });

        $scope.$watch('detail.year', function () {
            $scope.detail.sem = null;
            var key;
            if ($scope.detail.year) key = $scope.detail.year.id;
            $scope.options = $scope.semOptions[key];
        }, true);

        $scope.setdata = function () {
            $localstorage.set('dept', $scope.detail.dept.id);
            $localstorage.set('year', $scope.detail.year.id);
            $localstorage.set('sem', $scope.detail.sem.id);
            $state.go('studentOptions');
        };

        $scope.$on('NotificationRecieved', function () {
            $scope.notificationNum = $localstorage.get('notificationCounter', 0);
            $scope.$apply();
        });
        $scope.$on('ReadNotification', function () {
            $scope.notificationNum = $localstorage.get('notificationCounter', 0);
            $scope.$apply();
        });

        //$scope.noti = Object.keys($localstorage.getObj('unreadnoti'));
        //.map(function (key) {return $localstorage.getObj('unreadnoti')[key]});

        $scope.direct = function () {
            $ionicLoading.show();
            var match = false;
            var uid = $scope.detail.uid.toUpperCase();
            var counter = 0;
            $scope.deptOptions.forEach(function (value) {
                FirebaseRef.child('students/' + value.id + '/' + uid).once('value', function (data) {
                    if (data.exists()) {
                        match = true;
                        console.log('in');
                        $localstorage.set('dept', value.id);
                        $localstorage.set('year', data.val().year);
                        $localstorage.set('sem', data.val().year === 'be' ? '8' : data.val().year === 'te' ? '6' : data.val().year === 'se' ? '4' : '2');
                        $localstorage.set('rollno', data.val().rollno);
                        $localstorage.set('uid', uid);
                    }
                    counter++;
                    if (counter === $scope.deptOptions.length)
                        done();
                })
            });
            var done = function () {
                if (match)
                    $state.go('attDetails');
                else {
                    $ionicLoading.hide();
                    alertPopup('Invalid UID', 'assertive')
                }
            }     
                
            
            // FirebaseRef.child('students').on('value', function (snapshot) {
            //     snapshot.forEach(function (depts) {
            //         depts.forEach(function (uid) {
            //             if ($scope.detail.uid.toUpperCase() === uid.key()) {
            //                 match = true;
            //                 $localstorage.set('dept', depts.key());
            //                 $localstorage.set('year', uid.val().year);
            //                 $localstorage.set('sem', uid.val().year == 'be' ? '8' : uid.val().year == 'te' ? '6' : uid.val().year == 'se' ? '4' : '2');
            //                 $localstorage.set('rollno', uid.val().rollno);
            //                 $localstorage.set('uid', $scope.detail.uid.toUpperCase());
            //             }
            //         });
            //     });
            // });
        };

        //$localstorage.pushObj('unreadnoti', { 'title': 'sadjfhkjasdfas', 'message': 'sadjkaskd', 'date':'2016-08-09' });

        $scope.checkRegistration = function () {
            //   window.plugins.OneSignal.getTags(function(tags){
            //       if(tags == '{}')
            $scope.modal.show();
            //   else
            //   alertPopup('Already Registered','assertive');
            //   });
        };
        $scope.registerData = {};
        $scope.registerData.confirm = function () {
            window.plugins.OneSignal.sendTags({ Name: $scope.registerData.name, Department: $scope.registerData.dept.id, Year: $scope.registerData.year.id });
            window.plugins.OneSignal.registerForPushNotifications();
            $scope.modal.hide();
            alertPopup('Registered Successfully', 'assertive');

        };

        $ionicModal.fromTemplateUrl('templates/DevInfo.html', function ($ionicModal) {
            $scope.devmodal = $ionicModal;
        }, {
                scope: $scope,
                animation: 'slide-in-up'
            });

        $scope.goto = function (link) {
            cordova.InAppBrowser.open(link, '_system', 'location=yes');
        };


    });
