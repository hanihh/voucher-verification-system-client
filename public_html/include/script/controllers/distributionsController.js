/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$.getScript('include/ViewModels/Core/Distribution.js', function () {
});
$.getScript('include/ViewModels/Core/Program.js', function () {
});
$.getScript('include/ViewModels/Core/Donor.js', function () {
});

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('DistributionsController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {                        
        //$scope.distribution = new Distribution();
  
  //Programs
            WizardViewsService.getPrograms().success(function (data) {
                var data = data["data"]["program"];
                var program = new Program();
                $scope.programItems = program.parseArray(data);
            });
        
        //Donors            
            WizardViewsService.getDonors().success(function (data) {
                var data = data["data"]["donor"];
                var donor = new Donor();
                $scope.donorItems = donor.parseArray(data);
            });        
        
        
          $scope.$watch('distribution.online', function (newVal, oldVal) {
                   console.log(newVal);
               
          });
          
        $scope.Save = function (distribution) {                         
            console.log(distribution);
             tree.AddDistributions();
           // WizardViewsService.createDistribution(distribution.parse($scope));
            
            //sharedProperties.setProperty('Checked');
            
            //treeProgress.distributionsChecked = true;
            //  alert($rootScope.treeProgress.distributionsChecked);
            
            //TreeProgress.AddDistributions("gff");
            
            
        }
    }]);

