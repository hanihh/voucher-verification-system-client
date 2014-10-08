/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('beneficiaryDistController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {                        
        $scope.beneficiary = {};
        $scope.filter = {};
        
        $.getScript('include/ViewModels/Beneficiary/Beneficiary.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getBeneficiaries().success(function (data) {
                var data = data["data"]["beneficiary"];
    
                var beneficiary = new Beneficiary();
                $scope.beneficiaries = beneficiary.parseArray(data);
            });
        });
        
        /*
        $scope.Save = function (beneficiary) {
            //sharedProperties.setProperty('Checked');
            WizardViewsService.createDistribution(dist);
            treeProgress.distributionsChecked = true;
            //  alert($rootScope.treeProgress.distributionsChecked);
        }
        */
       
       $scope.Filter = function(filter){
            console.log(filter);
            /*
             WizardViewsService.getBeneficiaries(filter).success(function (data) {
                var data = data["data"]["beneficiary"];
    
                var beneficiary = new Beneficiary();
                $scope.beneficiaries = beneficiary.parseArray(data);
            });
            */
       }
    }]);

