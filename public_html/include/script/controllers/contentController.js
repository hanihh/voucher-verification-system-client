/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.controller("ContentController", ['$scope', '$rootScope', function ($scope, $rootScope) {
        //$scope.distributionChecked = sharedProperties.getProperty();
       // $scope.contentHtmlPage = "views/wizardviews/Distributions.html";
       //$("#tree_1").jstree("destroy");
       //UITree.init();
    }]);


app.directive("Subdistributions", function(){
   return {
       restrict: "E",
       template: _SystemNotesTemplates.subdistributions     
   } 
});

app.directive("Vendors", function(){
   return {
       restrict: "E",
       template: _SystemNotesTemplates.subdistributions     
   } 
});