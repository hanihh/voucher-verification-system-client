/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VoucherTypeController', ['$scope', '$stateParams','$state', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams,$state, DataProviderService, SharedPropertiesService) {

        $.getScript('include/ViewModels/Core/Voucher_type.js', function ()
        {
            $.getScript('include/ViewModels/Relational/subdistributionVoucherType.js', function ()
            {
                // *** Build Tree by existing distribution id ***
                var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                            if (dist_id && SharedPropertiesService.getIsDistributionsView() === false && (SharedPropertiesService.getTreeBuildStatus() === false ||
                                    dist_id !== SharedPropertiesService.getDistributionId())) {       
                    SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
                }
                // **********************************************
                
                DataProviderService.getVoucherTypes().success(function (data) {
                    var data = data["data"]["voucherType"];
                    var voucher_type = new Voucher_type();
                    $scope.voucherTypeItems = voucher_type.parseArray(data);
                    console.log($scope.voucherTypeItems);
                });


                $scope.subdistributionVoucherType = new SubdistributionVoucherType();
//                var startDate = SharedPropertiesService.getDistributionStartDate(); 
//                var minDate = new Date(startDate);
         //       console.log($scope.subdistributionVoucherType.expiration_date);
           //     var expireDate = new Date($scope.subdistributionVoucherType.expiration_date);
             //   console.log(expireDate);
//                $( "#expiredate" ).datepicker({
//                    rtl: Metronic.isRTL(),
//                    orientation: "left",
//                    autoclose: true,
//                    changeMonth: true,
//                    changeYear: true,
//                    minDate: minDate,
//                    maxDate: expireDate           
//                });
//                
//                $('#expiredate').data('datepicker').setDate(expireDate);                                                    
                var subdist_id = ($stateParams) ? $stateParams.subdist_id : null;
                
                var id = ($stateParams) ? $stateParams.vouchertype_id : null;
                if (id) {
                    DataProviderService.getSubdistributionVoucher(id).success(function (data) {
                        var data = data["data"]["distributionVoucher"];
                        var subdistributionVoucherType = new SubdistributionVoucherType();
                        $scope.subdistributionVoucherType = subdistributionVoucherType.parse(data);
                        console.log($scope.subdistributionVoucherType);
                        
                        
                            $('#s2id_typeList > a > span:first').html(data.type.name);
                            
                        // *** Checking dates and filling Date Range Control ***

                        //var expireDate = new Date($scope.subdistributionVoucherType.expiration_date);

//                        var expireString = "";                 
//                        if (dates.check(expireDate)) {
//                            $('#expiredate').data('datepicker').setDate(expireDate);
//                            expireString = expireDate.toDateString();
//                        }

                       // $scope.expireDate = expireString;
                        // ******************************************************
                    });
                }
                
                $scope.Save = function (subdistributionVoucherType) {
                    subdistributionVoucherType.subdistribution_id = subdist_id;
                    subdistributionVoucherType.expiration_date = SharedPropertiesService.getDistributionEndDate();  
                    console.log(subdistributionVoucherType);
                    DataProviderService.createSubdistributionVoucher(subdistributionVoucherType).success(function (data) {
                        var id = data["data"]["distributionVoucher"]["id"];
                        subdistributionVoucherType.id = id;
//                        model.type = vouchType.type;
                        SharedPropertiesService.getTree().AddType(subdistributionVoucherType, true);
                           subdistributionVoucherType.id = null;
                           
                           toastr.success('Voucher Type has been added successfully!');
                    });
                }
                
                  $scope.Reset = function(){       
                        $state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
                        toastr.warning('Form has been reset!');                       
                    }
            });
        });
    }]);

