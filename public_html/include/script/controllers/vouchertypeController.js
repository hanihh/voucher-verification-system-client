/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VoucherTypeController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {                        
        $scope.vouchType = {};

        $.getScript('include/ViewModels/Core/Voucher_type.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getVoucherTypes().success(function (data) {
                var data = data["data"]["voucherType"];
                var voucher_type = new Voucher_type();
                $scope.voucherTypeItems = voucher_type.parseArray(data);
            });
        });

     
        
        $scope.Save = function (vouchType) {
            //sharedProperties.setProperty('Checked');
            WizardViewsService.createDistribution(vouchType);
            treeProgress.distributionsChecked = true;
            //  alert($rootScope.treeProgress.distributionsChecked);
        }
    }]);

