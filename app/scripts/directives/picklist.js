'use strict';

angular.module('HazriSV')
    .directive('pickList', function ($ionicPopup) {

        var directive = {};

        directive.restrict = 'E';
        directive.template = '<div class="item item-borderless">{{title}}<span class="item-note">{{model.name}} <span class="icon ion-chevron-down"></span></span></div>';

        directive.scope = {
            items: '=list',
            model: "=model",
            title: "=heading"
        }

        directive.link = function (scope, elem, attrs) {
            elem.bind('click', function () {
                scope.popup = $ionicPopup.show({
                    title: '',
                    template: '<ion-radio ng-repeat="item in items" ng-value="item" ng-model="model" ng-change="onChangeModel(item)">{{item.name}}</ion-radio>',
                    buttons: [{
                        text: 'Ok'
                    }],
                    scope: scope
                });
            })

            scope.onChangeModel = function (item) {
                scope.popup.close();
                scope.model = item;
            }
        }

        return directive;
    });

