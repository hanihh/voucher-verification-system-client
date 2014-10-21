/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VoucherTypeController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {


        $.getScript('include/ViewModels/Core/Voucher_type.js', function ()
        {
            $.getScript('include/ViewModels/Relational/subdistributionVoucherType.js', function ()
            {
                // script is now loaded and executed.
                // put your dependent JS here.
                DataProviderService.getVoucherTypes().success(function (data) {
                    var data = data["data"]["voucherType"];
                    var voucher_type = new Voucher_type();
                    $scope.voucherTypeItems = voucher_type.parseArray(data);
                    console.log($scope.voucherTypeItems);
                });


                $scope.distributionVoucherType = new SubdistributionVoucherType();
                $scope.distributionVoucherType.expireDate = SharedPropertiesService.getDistributionEndDate();


                var id = ($stateParams) ? $stateParams.id : null;
                if (id) {
                    DataProviderService.getSubdistributionVoucher(id).success(function (data) {
                        var data = data["data"]["distributionVoucher"];
                        var distributionVoucherType = new SubdistributionVoucherType();
                        $scope.distributionVoucherType = distributionVoucherType.parse(data);
                        
                         // *** Checking dates and filling Date Range Control ***
                                            
                                            var expireDate = new Date($scope.distributionVoucherType.expiration_date);

                                            var expireString = "";                                      ;
                                            if (dates.check(expireDate)) {
                                                $('#expiredate').data('datepicker').setDate(expireDate);
                                                expireString = expireDate.toDateString();
                                            }                                         

                                            $scope.expireDate = expireString;
                                            // ******************************************************
                    });
                }
                $scope.Save = function (vouchType) {
                    var model = {
                        type_id: vouchType.type.id,
                        expiration_date: vouchType.expireDate,
                        value: vouchType.value,
                        subdistribution_id: SharedPropertiesService.getSubdistributionIdForNewVoucherValue()
                    }

                    DataProviderService.createSubdistributionVoucher(model).success(function (data) {
                        console.log(data);
                        var id = data["data"]["distributionVoucher"]["id"];
                        model.id = id;
                        model.type = vouchType.type;
                        SharedPropertiesService.getTree().AddType(model);
                    });
                }
            });
        });
    }]);

