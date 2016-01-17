'use strict';

angular.module('HazriSV', ['ionic', 'ngCordova', 'ngResource', 'firebase', 'highcharts-ng'])

    .run(function ($ionicPlatform, $rootScope, $ionicLoading, $window, $localstorage ,$state) {

        $ionicPlatform.ready(function () {

            var didReceiveRemoteNotificationCallBack = function (jsonData) {
               // alert("Notification received:\n" + JSON.stringify(jsonData));
                $localstorage.pushObj("unreadnoti", { "title": jsonData.additionalData.title, "message": jsonData.message, "date": Date() });
               $state.go('notifications');
            }
            if (window.StatusBar) {
                if (ionic.Platform.isAndroid()) {
                    StatusBar.backgroundColorByHexString("#33cd5f");
                } else {
                    StatusBar.styleLightContent();
                }
            }
            window.plugins.OneSignal.init('e4b6d1df-1400-476d-b108-57baa5b960dc',
                { googleProjectNumber: '445630381429' }, didReceiveRemoteNotificationCallBack);
            window.plugins.OneSignal.enableNotificationsWhenActive(true);
  
            // Show an alert box if a notification comes in when the user is in your app.
            //window.plugins.OneSignal.enableInAppAlertNotification(true);
        });

        // $rootScope.$on('loading:show', function () {
        //     $ionicLoading.show();
        // });

        // $rootScope.$on('loading:hide', function () {
        //     $ionicLoading.hide();
        // });

        // $rootScope.$on("$stateChangeStart", function () {
        //     $rootScope.$broadcast('loading:show');
        // });

        // $rootScope.$on("$stateChangeSuccess", function () {
        //     $rootScope.$broadcast('loading:hide');
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

            .state('studentOptions', {
                url: '/studentoptions',
                cache: false,
                templateUrl: 'templates/StudentOptions.html'
            })

            .state('nameList', {
                url: '/namelist',
                cache: false,
                templateUrl: 'templates/NameList.html',
                controller: 'NameListCtrl'
            })

            .state('subList', {
                url: '/sublist',
                cache: false,
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
                cache: false,
                templateUrl: 'templates/BatchOption.html',
                controller: 'BatchOptionCtrl'
            })

            .state('timetable', {
                url: '/timetable',
                cache: false,
                templateUrl: 'templates/Timetable.html',
                controller: 'TimetableCtrl'

            })

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

            .state('options', {
                url: '/options',
                cache: false,
                templateUrl: 'templates/Options.html',
                controller: 'OptionsCtrl'
            });

        $urlRouterProvider.otherwise('/select');
    });


