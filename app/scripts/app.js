'use strict';

angular.module('HazriSV', ['ionic', 'ngCordova', 'ngResource', 'firebase', 'highcharts-ng'])

    .run(function ($ionicPlatform, $rootScope, $ionicLoading, $window, $localstorage, $state, $cordovaNetwork, $filter , $ionicHistory) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                if (ionic.Platform.isAndroid()) {
                    StatusBar.backgroundColorByHexString("#01579B");
                } else {
                    StatusBar.styleLightContent();
                }
            }

            var NotificationRecieved = function (jsonData) {
                $localstorage.pushObj("unreadnoti", { "title": jsonData.additionalData.title, "message": jsonData.message, "date": $filter('date')(new Date(), 'dd-MM-yyyy') });
                $localstorage.set("notificationCounter", $localstorage.get("notificationCounter", 0) == 0 ? 1 : (parseInt($localstorage.get("notificationCounter"))) + 1);
                $rootScope.$broadcast('NotificationRecieved');
                if (jsonData.additionalData) {
                    if (jsonData.additionalData.yourUrlKey)
                        location.href = jsonData.additionalData.yourUrlKey;
                }
            }

            if (window.cordova) {
                window.plugins.OneSignal.init('e4b6d1df-1400-476d-b108-57baa5b960dc',
                    { googleProjectNumber: '445630381429', autoRegister: false }, NotificationRecieved);

            }
            /*Online check*/
            if (window.cordova) {
                $rootScope.isOnline = $cordovaNetwork.isOnline();
                $rootScope.$apply();
            }
            else {
                $rootScope.isOnline = true;
            }

            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $rootScope.isOnline = true;
                $rootScope.$apply();
                console.log('online');
            });

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                $rootScope.isOnline = false;
                $rootScope.$apply();
                console.log('offline');
            });

            $rootScope.goBack = function() {
                $ionicHistory.goBack();
            };
            // Show an alert box if a notification comes in when the user is in your app.
            //window.plugins.OneSignal.enableInAppAlertNotification(true);
        });

        // document.addEventListener("click", function () {
        //     document.getElementById("badge").style.display = "none";
        // });

    })

    .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('select', {
                url: '/select',
                //cache: false,
                templateUrl: 'templates/Select.html',
                controller: 'SelectCtrl'
            })

            .state('reportbugs', {
                url: '/reportbugs',
                templateUrl: 'templates/ReportBugs.html',
                controller: 'ReportBugCtrl'
            })

            .state('studentOptions', {
                url: '/studentoptions',
                templateUrl: 'templates/StudentOptions.html',
                controller: 'StudentOptionsCtrl'
            })

            .state('nameList', {
                url: '/namelist',
                // cache: false,
                templateUrl: 'templates/NameList.html',
                controller: 'NameListCtrl'
            })

            .state('subList', {
                url: '/sublist',
                // cache: false,
                templateUrl: 'templates/SubList.html',
                controller: 'SubListCtrl'
            })

            .state('topicDetails', {
                url: '/topicdetails',
                cache: false,
                templateUrl: 'templates/TopicDetails.html',
                controller: 'TopicDetailsCtrl'
            })

            .state('batchOption', {
                url: '/batchoption',
                // cache: false,
                templateUrl: 'templates/BatchOption.html',
                controller: 'BatchOptionCtrl'
            })

            // .state('timetable', {
            //     url: '/timetable',
            //     cache: false,
            //     templateUrl: 'templates/Timetable.html',
            //     controller: 'TimetableCtrl'

            // })

            .state('notifications', {
                url: '/notifications',
                cache: false,
                templateUrl: 'templates/Notifications.html',
                controller: 'NotificationsCtrl'
            })

            .state('attDetails', {
                url: '/attdetails',
                cache: false,
                templateUrl: 'templates/AttendanceDetails.html',
                controller: 'AttendanceDetailsCtrl'

            })

        $urlRouterProvider.otherwise('/select');
    });


