'use strict';

angular.module('HazriSV')
  .filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        var x = a[field];
        var y = b[field];
        if(!isNaN(x) && !isNaN(y)) {
          x = parseInt(x); x = parseInt(x);
        }
        return (x > y ? 1 : -1);
      });
      if(reverse) filtered.reverse();
      return filtered;
    };
  });
