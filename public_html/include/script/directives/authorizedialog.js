/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
app.directive('authorizedialog', function (AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<a id="AuthorizeDialog" ng-if="visible" href="#Authorize" data-toggle="modal"></a>',
    link: function (scope) {
      var showDialog = function () {        
       $("#AuthorizeDialog").click();
      };
  
      scope.visible = true;
      scope.$on(AUTH_EVENTS.notAuthorized, showDialog);
    }
  };
})