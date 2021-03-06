'use strict';

angular.module('HazriSV')

    .controller('AttendanceDetailsCtrl', function ($scope, $ionicHistory, $ionicLoading, $http, $localstorage, apiUrl, alertPopup) {
        $scope.per = {
            totper: null,
            prper: null,
            thper: null
        };
        $scope.done = false;
        $ionicLoading.show();
        $scope.getdata = function () {
            $scope.data = [];
            var alldata,
                url = '',
                pratt = [],
                thatt = [],
                prtot = [],
                thtot = [],
                prsub = [],
                thsub = [],
                totpatt = 0,
                atpatt = 0,
                tottatt = 0,
                attatt = 0;

            url = apiUrl + $localstorage.get('dept') + '/' + $localstorage.get('year') + '/' + $localstorage.get('sem') + '/' + $localstorage.get('uid');

            $http({ method: 'GET', url: url }).
                then(function successCallback(response) {
                    alldata = response.data;
                    $scope.data = alldata;
                    var data = alldata.attDataPr;
                    for (var key in data) {
                        pratt.push(data[key].att);
                        prtot.push(data[key].totalAtt);
                        prsub.push(data[key].sname);
                        totpatt += data[key].totalAtt;
                        atpatt += data[key].att;
                    }

                    data = alldata.attDataTh;
                    for (var key in data) {
                        thatt.push(data[key].att);
                        thtot.push(data[key].totalAtt);
                        thsub.push(data[key].sname);
                        tottatt += data[key].totalAtt;
                        attatt += data[key].att;
                    }

                    $scope.per.totper = (attatt + atpatt + $scope.data.extra) / (tottatt + totpatt) * 100;

                }, function errorCallback(response) {
                    alertPopup('No Internet Connection', 'assertive');
                    $ionicHistory.goBack();
                }).finally(function () {

                    $scope.theory = {
                        options: {
                            exporting: { enabled: false },
                            credits: { enabled: false },
                            chart: {
                                type: 'column'
                            },
                            plotOptions: {
                                column: {
                                    dataLabels: {
                                        enabled: true,
                                        color:"grey",
                                        y:25,
                                        x:-2
                                    },
                                    animation: {
                                        duration: 500
                                    },
                                    grouping: false,
                                    shadow: false,
                                    borderWidth: 0
                                }
                            }
                        },
                        xAxis: {
                            title: {
                                text: 'Subjects'
                            },
                            categories: thsub,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            //tickInterval: 2,
                            title: {
                                text: 'No. of Lectures'
                            },
                            labels:
                            {
                                enabled: false
                            },
                            allowDecimals: false
                        },
                        series: [{
                            name: 'Total Lectures',
                            color: 'rgba(165,170,217,.5)',
                            data: thtot
                        }, {
                                name: 'Attended',
                                color: 'rgba(94,203,141,1)',
                                data: thatt,
                                pointPadding: 0.2
                            }],
                        title: {
                            text: 'Theory Attendance : ' + (attatt / tottatt * 100).toFixed(2) + '%'
                        },
                        loading: false
                    };
                    $scope.practical = {
                        options: {
                            exporting: { enabled: false },
                            credits: { enabled: false },
                            chart: {
                                type: 'column'
                            },
                            plotOptions: {
                                column: {
                                    dataLabels: {
                                        enabled: true,
                                        color:"grey",
                                        y:25,
                                        x:-2
                                    },
                                    animation: {
                                        duration: 500
                                    },
                                    grouping: false,
                                    shadow: false,
                                    borderWidth: 0
                                }
                            }
                        },
                        xAxis: {
                            title: {
                                text: 'Subjects'
                            },
                            categories: prsub,
                            crosshair: true
                        },
                        yAxis: {
                            //tickInterval: 2,
                            min: 0,
                            title: {
                                text: 'No. of Practicals'
                            },
                            labels:
                            {
                                enabled: false
                            },
                            allowDecimals: false
                        },
                        series: [{
                            name: 'Total Lectures',
                            color: 'rgba(165,170,217,.5)',
                            data: prtot
                        }, {
                                name: 'Attended',
                                color: 'rgba(94,203,141,1)',
                                data: pratt,
                                pointPadding: 0.2
                            }],
                        title: {
                            text: 'Practical Attendance ' + (atpatt / totpatt * 100).toFixed(2) + '%'
                        },
                        loading: false
                    };
                    // $scope.$broadcast('scroll.refreshComplete');
                    $scope.done = true;
                    $ionicLoading.hide();
                });
        };
        $scope.getdata();
    });
