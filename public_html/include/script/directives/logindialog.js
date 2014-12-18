/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
app.directive('logindialog', function ( AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<div ng-if="visible" ng-include="\'views/Login.html\'">',  
//    scope: {
//        isLoginPage: '='
//    },
    link: function (scope, attrs) {
        console.log(scope.$eval(attrs.isLoginPage));
      var showDialog = function () {
        scope.visible = true;
      };
      
//      console.log($scope.isLoginPage);
//      if (!$scope.isLoginPage)
      scope.visible = false;
      //scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      //scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
})