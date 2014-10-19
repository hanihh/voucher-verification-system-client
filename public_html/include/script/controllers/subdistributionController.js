/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('subdistributionController', ['$scope', '$stateParams', '$compile', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, $compile, DataProviderService, SharedPropertiesService) {
        //Initializing Models for cascade select lists


        $.getScript('include/ViewModels/Core/Subdistribution.js', function () {
                 $.getScript('include/ViewModels/Core/Distribution_status.js', function () {
            $.getScript('include/ViewModels/Location/Country.js', function () {
                $.getScript('include/ViewModels/Location/Governorate.js', function () {
                    $.getScript('include/ViewModels/Location/District.js', function () {
                        $.getScript('include/ViewModels/Location/Subdistrict.js', function () {
                            $.getScript('include/ViewModels/Location/Community.js', function () {

                                $scope.country = {id: 0}
                                $scope.governorate = {id: 0}
                                $scope.district = {id: 0}
                                $scope.subdistrict = {id: 0}
                                $scope.subdistribution = new Subdistribution();
                                $scope.subdistribution.init();

                                $('#defaultrange').on('apply.daterangepicker', function (ev, picker) {
                                    $scope.subdistribution.start_date = picker.startDate.format('YYYY-MM-DD');                                    
                                    var today = new Date(); 
                                                      
                                    sub_startdate = dates.convert(picker.startDate);
                                    switch (dates.compare(picker.startDate,today)){
                                        case 0:
                                            alert("Active...");
                                            $scope.subdistribution.status_id = "Active...";
                                            break;
                                        case 1:
                                            alert("Pending...");
                                             $scope.subdistribution.status_id = "Pending...";
                                             break;                                     ;
                                    }
                                                                          
                                    $scope.subdistribution.end_date = picker.endDate.format('YYYY-MM-DD');
                                });

                                //--- Watching cascade select lists models ---//
                                $scope.$watch('country', function (newVal, oldVal) {
                                    if (newVal != oldVal)
                                    {
                                        console.log(newVal);
                                        $scope.governorate = {};
                                        $scope.district = {};
                                        $scope.subdistrict = {};
                                        $scope.subdistribution.community = {};
                                        $scope.governorate = {
                                            id: 0
                                        };
                                        $scope.district = {
                                            id: 0
                                        };
                                        $scope.subdistrict = {
                                            id: 0
                                        };
                                        $scope.subdistribution.community = {
                                            id: 0
                                        };
                                    }
                                });

                                $scope.$watch('governorate', function (newVal, oldVal) {
                                    if (newVal != oldVal)
                                    {
                                        console.log(newVal);
                                        $scope.district = {};
                                        $scope.subdistrict = {};
                                        $scope.subdistribution.community = {};
                                        $scope.district = {
                                            id: 0
                                        };
                                        $scope.subdistrict = {
                                            id: 0
                                        };
                                        $scope.subdistribution.community = {
                                            id: 0
                                        };
                                    }
                                });

                                $scope.$watch('district', function (newVal, oldVal) {
                                    if (newVal != oldVal)
                                    {
                                        console.log(newVal);
                                        $scope.subdistrict = {};
                                        $scope.subdistribution.community = {};
                                        $scope.subdistrict = {
                                            id: 0
                                        };
                                        $scope.subdistribution.community = {
                                            id: 0
                                        };
                                    }
                                });

                                $scope.$watch('subdistrict', function (newVal, oldVal) {
                                    if (newVal != oldVal)
                                    {
                                        console.log(newVal);
                                        $scope.subdistribution.community = {};
                                        $scope.subdistribution.community = {
                                            id: 0
                                        };
                                    }
                                });
                                // ------------------------------------------------ //


                                DataProviderService.getCountries().success(function (data) {
                                    var data = data["data"]["country"];
                                    var country = new Country();
                                    $scope.countryItems = country.parseArray(data);
                                });

                                // Governorates
                                DataProviderService.getGovernorates().success(function (data) {
                                    var data = data["data"]["governorate"];
                                    var governorate = new Governorate();
                                    $scope.governorateItems = governorate.parseArray(data);
                                });

                                // Districts
                                DataProviderService.getDistricts().success(function (data) {
                                    var data = data["data"]["district"];
                                    var district = new District();
                                    $scope.districtItems = district.parseArray(data);
                                });

                                // Subdistricts
                                DataProviderService.getSubdistricts().success(function (data) {
                                    var data = data["data"]["subdistrict"];
                                    var subdistrict = new Subdistrict();
                                    $scope.subdistrictItems = subdistrict.parseArray(data);
                                });

                                // Communities
                                DataProviderService.getCommunities().success(function (data) {
                                    var data = data["data"]["community"];
                                    var community = new Community();
                                    $scope.communityItems = community.parseArray(data);
                                });
                                
                                  // Status
                                DataProviderService.getStatus().success(function (data) {
                                    var data = data["data"]["distributionStatus"];
                                    var distribution_status = new Distribution_status();
                                    $scope.statusItems = distribution_status.parseArray(data);
                                });

                                var id = ($stateParams) ? $stateParams.id : null;

                                if (id)
                                {
                                    DataProviderService.getSubdistributions(id).success(function (data) {
                                        var data = data["data"]["subdistribution"];
                                        var subdistribution = new Subdistribution();
                                        $scope.subdistribution = subdistribution.parse(data);
                                        var community = data["community"];
                                        // Subdistricts

                                        DataProviderService.getSubdistricts(community["subdistrict_id"]).success(function (data) {
                                            var subdistrict = data["data"]["subdistrict"];
                                            // Districts
                                            DataProviderService.getDistricts(subdistrict["district_id"]).success(function (data) {
                                                var district = data["data"]["district"];
                                                // Governorates
                                                DataProviderService.getGovernorates(district["governorate_id"]).success(function (data) {
                                                    var governorate = data["data"]["governorate"];
                                                    // Country
                                                    DataProviderService.getCountries(governorate["country_id"]).success(function (data) {
                                                        var country = data["data"]["country"];

                                                        var countryModel = new Country();
                                                        var governorateModel = new Governorate();
                                                        var districtModel = new District();
                                                        var subdistrictModel = new Subdistrict();

                                                        $scope.country = countryModel.parse(country);
                                                        $scope.governorate = governorateModel.parse(governorate);
                                                        $scope.district = districtModel.parse(district);
                                                        $scope.subdistrict = subdistrictModel.parse(subdistrict);
                                                        $scope.subdistribution.community = community;

                                                    });
                                                });
                                            });
                                        });
                                        var startDate = new Date($scope.subdistribution.start_date);
                                        var endDate = new Date($scope.subdistribution.end_date);

                                        $('#defaultrange').data('daterangepicker').setStartDate(startDate);
                                        $('#defaultrange').data('daterangepicker').setEndDate(endDate);

                                        $scope.dateRange = startDate.toDateString() + " - " + endDate.toDateString();
                                    });
                                }

                                $scope.Save = function (subdistributionForm, subdistribution) {
                                    console.log($('#defaultrange'));

                                    if (subdistributionForm.$valid) {
                                        //subdistributionForm.$setPristine(true);

                                        var model = {code: subdistribution.code,
                                            note: subdistribution.note,
                                            //start_date: subdistribution.start_date,
                                            //end_date: subdistribution.end_date,
                                            start_date: "2014",
                                            end_date: "2015",
                                            status_id: "4", //Pending
                                            community_id: subdistribution.community.id,
                                            distribution_id: SharedPropertiesService.getDistributionId()
                                        }
                                        DataProviderService.createSubDistribution(model).success(function (data) {
                                            var id = data["data"]["subdistribution"]["id"];
                                            model.id = id;
                                            SharedPropertiesService.getTree().AddSubdistribution(model);
                                        });
                                    }
                                    else
                                        alert("not valid");
                                }

                              });
                           });
                        });
                    });
                });
            });
        });
    }]);

