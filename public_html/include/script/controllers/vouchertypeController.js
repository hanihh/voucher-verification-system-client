/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VoucherTypeController', ['$scope', '$rootScope', 'WizardViewsService', 'SharedPropertiesService', function ($scope, $rootScope, WizardViewsService, SharedPropertiesService) {
  

        $.getScript('include/ViewModels/Core/Voucher_type.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getVoucherTypes().success(function (data) {
                var data = data["data"]["voucherType"];
                var voucher_type = new Voucher_type();
                $scope.voucherTypeItems = voucher_type.parseArray(data);
            });
      

      $scope.vouchType = {
            type: "",
            expireDate: SharedPropertiesService.getDistributionEndDate(),
            value: ""
        };

        $scope.Save = function (vouchType) {
            var model = {
                type_id: vouchType.type.id,
                expiration_date: vouchType.expireDate,
                value: vouchType.value,
                subdistribution_id: SharedPropertiesService.getSubdistributionIdForNewVoucherValue()
            }

            WizardViewsService.createSubdistributionVoucher(model).success(function (data) {
                console.log(data);
                var id = data["data"]["distributionVoucher"]["id"];
                model.id = id;
                model.type = vouchType.type;
                SharedPropertiesService.getTree().AddType(model);
            });
        }
          });
    }]);

