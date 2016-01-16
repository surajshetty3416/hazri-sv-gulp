'use strict';

angular.module('HazriSV')

  .controller('AttendanceDetailsCtrl',function ($scope, $ionicLoading, $http, $localstorage) {
        $scope.per = {
            totper: null,
            prper: null,
            thper: null
        };
        $ionicLoading.show();
        $scope.getdata = function () {
            var alldata,url='', pratt = [], thatt = [], prtot = [], thtot = [], prsub = [], thsub = [], totpatt = 0, atpatt = 0, tottatt = 0, attatt = 0;//, present = ['Present'], absent = ['Absent'];
            //console.log($localstorage.get('uid'));
            url='http://bvcoeportal.orgfree.com/api/student_att_calc.php/'+$localstorage.get('dept')+'/'+$localstorage.get('year')+'/'+$localstorage.get('sem')+'/'+$localstorage.get('uid');
            $http({ method: 'GET', url:url}).
                then(function successCallback(response) {
                    alldata = response.data;
                   // console.log(alldata.uid);
                    // var uid = alldata.uid;
                    // var rollno =alldata.rollno;
                    // var name =alldata.name;
                    // var attTh= alldata.attDataTh;
                    // var attPr=alldata.attDataPr;
                    var data=alldata.attDataPr;
                  for(var key in  data )
                        {
                            
                            pratt.push(data[key].att);
                            prtot.push(data[key].totalAtt);
                            prsub.push(data[key].sname);
                            totpatt += data[key].totalAtt;
                            atpatt += data[key].att;
                        }
                         data=alldata.attDataTh;
                         for(var key in  data )
                        {
                            
                            thatt.push(data[key].att);
                            thtot.push(data[key].totalAtt);
                            thsub.push(data[key].sname);
                            tottatt += data[key].totalAtt;
                            attatt += data[key].att;
                        }
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
