/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller("HeaderController", function ($scope, $rootScope, $window, AUTH_EVENTS, AuthService) {
    $scope.logout = function () {   
        AuthService.logout().then(function () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            $scope.clearCurrentUser();
            // change the path
//            $window.location.reload();
        }, function () {
            //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    }
});