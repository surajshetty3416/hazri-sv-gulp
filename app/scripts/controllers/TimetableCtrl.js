'use strict';

angular.module('HazriSV')


.controller('TimetableCtrl', function($scope, $ionicPlatform, $cordovaCamera, $ionicActionSheet, $ionicModal, $ionicLoading, SVUrl, $localstorage) {

  $ionicLoading.show();
  var tref = new Firebase(SVUrl);
  tref = tref.child('timetables');
  $scope.ttImages = [];
  tref.orderByChild('dept').equalTo($localstorage.get('dept')).once('value', function (snapshot) {
    var timetables = snapshot.val();
    for(var t in timetables){
      if(timetables[t].year === $localstorage.get('year') && timetables[t].sem === $localstorage.get('sem')){
        $scope.ttImages.push({
          key: t,
          time: timetables[t].timestamp
        })
      }
    }
    $scope.$apply();
    $ionicLoading.hide();
    console.log($scope.ttImages);
  });

//   $scope.upload = function (index) {
//     $ionicPlatform.ready(function () {
//       var options = {
//         quality: 100,
//         destinationType: Camera.DestinationType.DATA_URL,
//           sourceType: index + 1,    //1 for camera, 2 for gallery
//           allowEdit: true,
//           encodingType: Camera.EncodingType.JPEG,
//           targetWidth: 700,
//           targetHeight: 500,
//           popoverOptions: CameraPopoverOptions,
//           saveToPhotoAlbum: false,
//           correctOrientation:true
//         };
//         var dept = $localstorage.get('dept'),
//         year = $localstorage.get('year'),
//         sem = $localstorage.get('sem');

//         $cordovaCamera.getPicture(options).then(function(imageData) {
//           $ionicLoading.show();
//           var base64 = "data:image/jpeg;base64," + imageData;
//           tref.push({
//             dept: dept,
//             year: year,
//             sem: sem,
//             img: base64,
//             timestamp: Firebase.ServerValue.TIMESTAMP
//           }, function (err) {
//             $scope.ttImages.push({
//               src: base64
//             });
//             $ionicLoading.hide();
//           });
//         }, function(err) {
//           // error
//         });
//       });
//   };

  $scope.actionSheet = function () {
    $ionicActionSheet.show({
      buttons: [
      { text: '<i class="icon ion-android-camera positive"></i> Take picture from camera' },
      { text: '<i class="icon ion-android-image positive"></i> Choose from gallery' }
      ],
      titleText: 'Upload a picture',
      cancelText: 'Cancel',
      cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          $scope.upload(index);
          return true;
        }
      });
  };

  $ionicModal.fromTemplateUrl('templates/timetableModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showTt = function (timetable) {
    $ionicLoading.show();

    $scope.tt = timetable;
    tref.child(timetable.key+'/img').once('value', function (snapshot) {
      $scope.tt.src = snapshot.val();
      $ionicLoading.hide();
      $scope.modal.show();
    });

  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
    console.log('destroyed');
  });


});
