/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VendorController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {                        
        $scope.dist = {};

         $.getScript('include/ViewModels/Vendor/Vendor.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getVendors().success(function (data) {
                       
                var data = data["data"]["vendor"];
    
                var vendor = new Vendor();
                $scope.vendorItems = vendor.parseArray(data);
            });
        });
        
        $scope.Save = function (dist) {
            //sharedProperties.setProperty('Checked');
            WizardViewsService.createDistribution(dist);
            treeProgress.distributionsChecked = true;
            //  alert($rootScope.treeProgress.distributionsChecked);
        }
    }]);
