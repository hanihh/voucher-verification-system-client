/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller("ContentController", ['$scope', 'DataProviderService', 'SharedPropertiesService', function ($scope, DataProviderService, SharedPropertiesService) {            
        $scope.contentTitle = {};
        $scope.contentTitle.title = "";
        
        $scope.isLoginPage = false;
}]);
