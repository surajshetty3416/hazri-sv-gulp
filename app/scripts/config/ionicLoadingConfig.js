'use strict';

/**
 * @ngdoc constant
 * @name HazriSV.$ionicLoadingConfig
 * @description
 * # $ionicLoadingConfig
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('HazriSV')

  // development
  .constant('$ionicLoadingConfig', {
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
  });