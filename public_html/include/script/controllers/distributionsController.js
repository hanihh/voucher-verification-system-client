/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('DistributionsController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {                        
        $scope.dist = {};

        $.getScript('include/ViewModels/Core/Program.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getPrograms().success(function (data) {
                var data = data["data"]["program"];
                var program = new Program();
                $scope.programItems = program.parseArray(data);
            });
        });


        $.getScript('include/ViewModels/Core/Donor.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getDonors().success(function (data) {
                var data = data["data"]["donor"];
                var donor = new Donor();
                $scope.donorItems = donor.parseArray(data);
            });
        });
        
        $scope.Save = function (dist) {
            //sharedProperties.setProperty('Checked');
            //WizardViewsService.createDistribution(dist);
            treeProgress.distributionsChecked = true;
            //  alert($rootScope.treeProgress.distributionsChecked);
            
            TreeProgress.AddDistributions("gff");
        }
    }]);

