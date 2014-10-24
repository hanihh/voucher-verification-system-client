/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var addPhones = [];

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VendorController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {


        $.getScript('include/ViewModels/Vendor/Vendor.js', function () {
            $.getScript('include/ViewModels/Relational/Vendor_mobile.js', function () {
                $.getScript('include/ViewModels/Vendor/Phone.js', function () {

                    $scope.vendor_mobile = new Vendor_mobile();
                     addPhones = [];
                     
                    $("#tagsChosen").tagsInput({
                            'minChars': 0,
                            'interactive': false,
                            'onRemoveTag': function (data) {
                                tagsNum--;      
                                addPhones.pop($.grep($scope.phones, function(e){ return e.imei === data}));                          
                            },
                            'onAddTag': function (data) {
                                tagsNum++;
                            }
                        });
                        
                    $('#typeahead_imei').on('typeahead:selected', function (e, data) {                      
                        addMoreThanOne = false;
                        if ($('#tagsChosen').attr('value').indexOf(data.value) < 0) {
                            if (addMoreThanOne){
                                $('#tagsChosen').addTag(data.value);
                                addPhones.push($.grep($scope.phones, function(e){ return e.imei === data.value}));    
                            }
                            else if (tagsNum == 0) {
                                $('#tagsChosen').addTag(data.value);
                                 addPhones.push($.grep($scope.phones, function(e){ return e.imei === data.value}));                              
                            } else
                                $.notific8('You can\'t add more than one phone when the distribution status is Offline.',
                                        {
                                            life: 5000,
                                            theme: "lemon",
                                            icon: 'check-mark-2',
                                            sticky: false,
                                            horizontalEdge: 'bottom',
                                            verticalEdge: 'right',
                                            zindex: 9999
                                        });
                        }
                        else {
                            $.notific8('This phone has been already entered.',
                                    {
                                        life: 5000,
                                        theme: "lemon",
                                        icon: 'check-mark-2',
                                        sticky: false,
                                        horizontalEdge: 'bottom',
                                        verticalEdge: 'right',
                                        zindex: 9999
                                    });
                        }
                    });

                    //Vendor
                    DataProviderService.getVendors().success(function (data) {
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
                        DataProviderService.getVendorMobiles(SharedPropertiesService.getDistributionId(), id).success(function (data) {
                            var data = data["data"]["vendor"];
                            var vendor_mobile = new Vendor_mobile();
                            $scope.vendor_mobile = vendor_mobile.parse(data);
                            console.log($scope.vendor_mobile);
                        });
                    }

                    $scope.Save = function (vendor_mobile) {
                        vendor_mobile.distribution_id = SharedPropertiesService.getDistributionId();
                        vendor_mobile.phones = addPhones;                        
                        var vendor_mobiles = vendor_mobile.Split();
                        console.log(vendor_mobiles);
                        for(i=0; i<vendor_mobiles.length; i++)
                        {
                            DataProviderService.createVendorMobile(vendor_mobiles[i]).success(function (data) {
//                                var id = data["data"]["vendorMobile"]["id"];
//                                vendor_mobile.id = id;
                                var vendor = $.grep($scope.vendorItems, function(e){ return e.id === vendor_mobile.vendor_id}); 
                                console.log(vendor);
                                SharedPropertiesService.getTree().AddVendor({id: vendor[0].id, name: vendor[0].en_name}, true);
                            });
                        }
                    }
                });
            });
        });
    }]);


    