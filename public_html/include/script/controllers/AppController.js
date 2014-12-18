/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller("AppController", ['$scope', 'USER_ROLES', 'AuthService', function ($scope, USER_ROLES, AuthService) {            
    $scope.csrfSecurityToken = "";
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.isLoginPage = true;
    
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };
    
    $scope.clearCurrentUser = function () {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
    };
    
    $scope.setCsrfSecurityToken = function(){
        $scope.csrfSecurityToken = AuthService.getCsrfSecurityToken();
    }        
    
    $scope.setCsrfSecurityToken();
}]);
