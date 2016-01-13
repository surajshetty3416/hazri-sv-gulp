'use strict';


angular.module('HazriSV')
  .factory('GetDepts', function(FirebaseRef, $localstorage, $q) {
      
      var defer = $q.defer();
      var deptoption = [];
      if (angular.equals($localstorage.getObj('deptoption'), {})) {
            console.log('in');
            FirebaseRef.child('departments').on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var id = childSnapshot.key();
                    var data = childSnapshot.val();
                    deptoption.push({ 'name': data.name, 'id': id });
                });
                console.log(deptoption);
                $localstorage.setObj('deptoption', deptoption);
                defer.resolve(deptoption);
            }, function(error){
                console.log(error);
                defer.reject();
            });
        }
        else {
            deptoption = $localstorage.getObj('deptoption');
            console.log('dept load success');
            defer.resolve(deptoption);
        }
        return defer.promise;
  });

