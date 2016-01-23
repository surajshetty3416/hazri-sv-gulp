'use strict';

angular.module('HazriSV')
  .factory('GetDepts', function(FirebaseRef, $localstorage, $q, $rootScope , alertPopup) {

      var defer = $q.defer();
      var options = {
        deptOptions : [],
        yearOptions : [],
        semOptions : {}
      };

      if (angular.equals($localstorage.getObj('options'), {})) {
          FirebaseRef.child('departments').once('value', function (snapshot) {
              snapshot.forEach(function (childSnapshot) {
                  var id = childSnapshot.key();
                  var data = childSnapshot.val();
                  options.deptOptions.push({ 'id': id, 'name': data.name });
              });
              FirebaseRef.child('year').once('value', function (years) {
                years = years.val();
                for(var year in years){
                  options.yearOptions.push({id:year, name: years[year].name});
                  options.semOptions[year] = years[year].sems;
                }
                $localstorage.setObj('options', options);
                defer.resolve(options);
              });
          }, function(error){
              console.log(error);
              defer.reject();
          });
      }
      else {
          options = $localstorage.getObj('options');
          defer.resolve(options);
      }
        return defer.promise;
  });

