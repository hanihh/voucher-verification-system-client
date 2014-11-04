/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VendorController', ['$scope', '$stateParams','$state', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams,$state, DataProviderService, SharedPropertiesService) {
        $.getScript('include/ViewModels/Vendor/Vendor.js', function () {
            $.getScript('include/ViewModels/Relational/Vendor_mobile.js', function () {
                $.getScript('include/ViewModels/Vendor/Phone.js', function () {
       

                    // *** Build Tree by existing distribution id ***
                    var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                    if (dist_id && SharedPropertiesService.getIsDistributionsView() === false && (SharedPropertiesService.getTreeBuildStatus() === false ||
                            dist_id !== SharedPropertiesService.getDistributionId())) {
                        SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
                    }
                    // **********************************************            
                    $scope.vendor_mobile = new Vendor_mobile();

                    var vendorIds = SharedPropertiesService.getTree().GetAddedVendorsIds(dist_id);

                    var filterString = [];
                    for (i = 0; i < vendorIds.length; i++) {
                        filterString.push(["id", vendorIds[i], "!="]); 
                    }
                    console.log(filterString);
                    //Vendor
                    DataProviderService.getVendorsByFilter(filterString).success(function (data) {
                        console.log(data);
                        var data = data["data"]["vendor"];
                        var vendor = new Vendor();
                        $scope.vendorItems = vendor.parseArray(data);
                    });

                    // Phones
                    DataProviderService.getPhones().success(function (data) {
                        var data = data["data"]["phone"];
                        var phone = new Phone();
                        $scope.phones = phone.parseArray(data);

                        //Function exists in the view file (html file)
                        InitImeiTypeahead($scope.phones, SharedPropertiesService.getDistributionStatus());
                    });

                    var id = ($stateParams) ? $stateParams.vendor_id : null;
                    if (id)
                    {
                        DataProviderService.getVendorMobilesByFilter([["distribution_id", dist_id, "="], ["vendor_id", id, "="]]).success(function (data) {
                            var data = data["data"]["vendorMobile"];
                            for (i = 0; i < data.length; i++) {
                                var phone = data[i].phone;
                                addPhones.push(phone);
                                $('#tagsChosen').addTag(phone.imei);
                            }
                            if( data.length > 0)
                            $('#s2id_vendorList > a > span:first').html((data.length ? data[0].vendor.en_name : data.vendor.en_name));
                        });
                    }

                    $scope.Save = function (vendor_mobile) {
                        var successfulAddition = false;
                        vendor_mobile.distribution_id = dist_id;
                        vendor_mobile.phones = addPhones;
                        var vendor_mobiles = vendor_mobile.SplitPhonesToSeperatedObjects();
                        console.log(vendor_mobiles);
                        console.log(addPhones);
                        for (i = 0; i < vendor_mobiles.length; i++)
                        {
                            DataProviderService.createVendorMobile(vendor_mobiles[i]).success(function (data) {                               
//                                var id = data["data"]["vendorMobile"]["id"];
//                                vendor_mobile.id = id;
//                                var vendor = $.grep($scope.vendorItems, function(e){ return e.id === vendor_mobile.vendor_id}); 
//                                console.log(vendor);
//                                SharedPropertiesService.getTree().AddVendor({vendor: vendor[0], distribution_id:  vendor_mobile.distribution_id}, false);
                                toastr.success('Vendor Mobile has been added successfully!');
                            });
                        }

                        var vendor = $.grep($scope.vendorItems, function (e) {
                            return e.id === vendor_mobile.vendor_id
                        })[0];
                        
                        SharedPropertiesService.getTree().AddVendor(vendor, dist_id, false);
                    }
                    
                      $scope.Reset = function(){       
                    
                        $state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
                        toastr.warning('Form has been reset!');                       
                    }
                });
            });
        });
    }]);


    
