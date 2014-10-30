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

   // *** Build Tree by existing distribution id ***
                var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                if ( dist_id && (SharedPropertiesService.getTreeBuildStatus() === false ||
                        dist_id !== SharedPropertiesService.getDistributionId())) {
                    SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
                }
                // **********************************************
                
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

                    var id = ($stateParams) ? $stateParams.vendormobile_id : null;
                    if (id)
                    {
                       // var filterString = [["distribution_id", dist_id, "="], ["vendor_id", vendor_id, "="]];
//                        DataProviderService.getVendorMobilesByFilter(filterString).success(function (data) {
                        DataProviderService.getVendorMobile(id).success(function (data) {
                            console.log(data);
                            var data = data["data"]["vendorMobile"];
                            var vendor_mobile = new Vendor_mobile();
                            console.log(data);
                            $scope.vendor_mobile = vendor_mobile.parse( (data.length ? data[0] : data) );
                            $('#s2id_vendorList > a > span:first').html( (data.length ? data[0].vendor.en_name : data.vendor.en_name) );
                                                                         
                        });
                    }

                    $scope.Save = function (vendor_mobile) {
                        vendor_mobile.distribution_id = SharedPropertiesService.getDistributionId();
                        vendor_mobile.phones = addPhones;                        
                        var vendor_mobiles = vendor_mobile.SplitPhonesToSeperatedObjects();
                        console.log(vendor_mobiles);
                        for(i=0; i< vendor_mobiles.length; i++)
                        {
                            DataProviderService.createVendorMobile(vendor_mobiles[i]).success(function (data) {
//                                var id = data["data"]["vendorMobile"]["id"];
//                                vendor_mobile.id = id;
                                var vendor = $.grep($scope.vendorItems, function(e){ return e.id === vendor_mobile.vendor_id}); 
                                console.log(vendor);
                                SharedPropertiesService.getTree().AddVendor({vendor: vendor[0], distribution_id:  vendor_mobile.distribution_id}, false);
                            });
                        }
                    }
                });
            });
        });
    }]);


    