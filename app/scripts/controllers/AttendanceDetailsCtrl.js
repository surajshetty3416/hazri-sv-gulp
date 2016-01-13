'use strict';

angular.module('HazriSV')

  .controller('AttendanceDetailsCtrl',function ($scope, $ionicLoading, $http, $localstorage) {
        $scope.per = {
            totper: null,
            prper: null,
            thper: null
        };

        $scope.getdata = function () {
            var alldata,url='', pratt = [], thatt = [], prtot = [], thtot = [], prsub = [], thsub = [], totpatt = 0, atpatt = 0, tottatt = 0, attatt = 0;//, present = ['Present'], absent = ['Absent'];
            // if($localstorage.get('direct')=='true')
            console.log($localstorage.get('uid'));
            url='http://cors.io/?u=http://bvcoeportal.orgfree.com/api/student_att_calc.php/'+$localstorage.get('uid')+'.json';
            // if($localstorage.get('direct')=='false')
            
            // {url='http://cors.io/?u=http://bvcoeportal.orgfree.com/api/index.php/' + $localstorage.get('dept') + '/' + $localstorage.get('year') + '/' + $localstorage.get('sem') + '/' + $localstorage.get('rollno') + '.json';}
            $http({ method: 'GET', url: url }).
                then(function successCallback(response) {
                    alldata = response.data;
                    alldata.forEach(function (element) {
                        if (element.type === 'pr') {
                            pratt.push(element.att);
                            prtot.push(element.totalAtt);
                            prsub.push(element.sname);
                            totpatt += element.totalAtt;
                            atpatt += element.att;
                        }
                        if (element.type === 'th') {
                            thatt.push(element.att);
                            thtot.push(element.totalAtt);
                            thsub.push(element.sname);
                            tottatt += element.totalAtt;
                            attatt += element.att;
                        }
                    }, this);
                    $scope.per.thper = attatt / tottatt * 100;
                    $scope.per.prper = atpatt / totpatt * 100;
                    $scope.per.totper = (attatt + atpatt) / (tottatt + totpatt) * 100;

                }, function errorCallback(response) {
                    console.log(response);
                }).finally(function () {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });

            $scope.theory = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    plotOptions: {
                        column: {
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
                    title: {
                        text: 'No. of Lectures'
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
                    text: 'Theory Attendance'
                },
                loading: false
            };
            $scope.practical = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    plotOptions: {
                        column: {
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
                    min: 0,
                    title: {
                        text: 'No. of Practicals'
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
                    text: 'Practical Attendance'
                },
                loading: false
            };
        };
        $scope.getdata();
    
  });
