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

                                    $scope.country = null;
                                    $scope.governorate = null;
                                    $scope.district = null;
                                    $scope.subdistrict = null;
                                    $scope.subdistribution = new Subdistribution();

                                    $('#defaultrange').on('apply.daterangepicker', function (ev, picker) {
                                        $scope.subdistribution.start_date = picker.startDate.format('YYYY-MM-DD');
                                        var today = new Date();
                                        var subdistStartDate = dates.convert($scope.subdistribution.start_date).setHours(0, 0, 0, 0);
                                        var todayDate = dates.convert(today).setHours(0, 0, 0, 0);
                                        switch (dates.compare(subdistStartDate, todayDate)) {
                                            case 0:
                                                $("#status").val("Active");
                                                $scope.subdistribution.status_id = 2;   //Active id
                                                break;
                                            case 1:
                                                $("#status").val("Pending");
                                                $scope.subdistribution.status_id = 4;   //Pending id
                                                break;
                                            case -1:
                                                console.log("Invalid Date");
                                                break;
                                        }

                                        $scope.subdistribution.end_date = picker.endDate.format('YYYY-MM-DD');
                                    });

                                    //--- Watching cascade select lists models ---//
                                    $scope.$watch('country', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            console.log(newVal);
                                            $scope.governorateItems = null;
                                            $scope.governorate = null;
                                            // Governorates
                                            DataProviderService.getGovernoratesByFilter([["country_id", newVal.id, '=']]).success(function (data) {
                                                var data = data["data"]["governorate"];
                                                //var governorate = new Governorate();
                                                //$scope.governorateItems = governorate.parseArray(data);
                                                $scope.governorateItems = data;
                                                //console.log( $scope.governorateItems);
                                            });
                                            
                                            $scope.district = null;
                                            $scope.subdistrict = null;
                                            $scope.subdistribution.community_id = null;
                                        }
                                    });

                                    $scope.$watch('governorate', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            console.log(newVal);
                                             $scope.districtItems = null;
                                            $scope.district = null;
                                            // Districts
                                            DataProviderService.getDistrictsByFilter([['governorate_id', newVal.id, '=']]).success(function (data) {
                                                var data = data["data"]["district"];
                                                $scope.districtItems = data;
                                                //console.log( $scope.districtItems);
                                            });

                                            $scope.subdistrict = null;
                                            $scope.subdistribution.community_id = null;
                                        }
                                    });

                                    $scope.$watch('district', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            console.log(newVal);
                                            
                                                               $scope.subdistrictItems = null;
                                            $scope.subdistrict = null;
                                            // Subdistricts
                                            DataProviderService.getSubdistrictsByFilter([['district_id', newVal.id, '=']]).success(function (data) {
                                                var data = data["data"]["subdistrict"];

                                                $scope.subdistrictItems = data;
                                                //console.log( $scope.subdistrictItems);
                                            });
                                            $scope.subdistribution.community_id = null;
                                        }
                                    });

                                    $scope.$watch('subdistrict', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            console.log(newVal);
                                                    $scope.communityItems = null;
                                            $scope.community = null;
                                            // Communities
                                            DataProviderService.getCommunitiesByFilter([['subdistrict_id', newVal.id, '=']]).success(function (data) {
                                                var data = data["data"]["community"];

                                                $scope.communityItems = data;
                                                //console.log( $scope.communityItems);
                                            });
                                        }
                                    });

                                    $scope.$watch('subdistribution.community_id', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            console.log(newVal);

                                        }
                                    });
                                    // ------------------------------------------------ //


                                    DataProviderService.getCountries().success(function (data) {
                                        var data = data["data"]["country"];
                                        var country = new Country();
                                        $scope.countryItems = country.parseArray(data);
                                        //console.log( $scope.countryItems);
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

                                                            $scope.country = countryModel.parse(country).id;
                                                            $scope.governorate = governorateModel.parse(governorate).id;
                                                            $scope.district = districtModel.parse(district).id;
                                                            $scope.subdistrict = subdistrictModel.parse(subdistrict).id;
                                                            $scope.subdistribution.community_id = community.id;

                                                        });
                                                    });
                                                });
                                            });

                                            // *** Checking dates and filling Date Range Control ***
                                            var startDate = new Date($scope.subdistribution.start_date);
                                            var endDate = new Date($scope.subdistribution.end_date);

                                            var startDateString = "";
                                            var endDateString = "";
                                            if (dates.check(startDate)) {
                                                $('#defaultrange').data('daterangepicker').setStartDate(startDate);
                                                startDateString = startDate.toDateString();
                                            }
                                            if (dates.check(endDate)) {
                                                $('#defaultrange').data('daterangepicker').setEndDate(endDate);
                                                endDateString = endDate.toDateString();
                                            }

                                            $scope.dateRange = startDateString + (startDateString == "" && endDateString == "" ? "" : " - ") + endDateString;
                                            // ******************************************************
                                        });
                                    }

                                    $scope.Save = function (subdistributionForm, subdistribution) {
                                        // if (subdistributionForm.$valid) {
                                        //subdistributionForm.$setPristine(true);                                                                       
                                        subdistribution.distribution_id = SharedPropertiesService.getDistributionId();

                                        console.log(subdistribution);
                                        DataProviderService.createSubDistribution(subdistribution).success(function (data) {
                                            console.log(data);
                                            var id = data["data"]["subdistribution"]["id"];
                                            subdistribution.id = id;
                                              console.log(subdistribution);
                                            SharedPropertiesService.getTree().AddSubdistribution(subdistribution);
                                        });
//                                        }
//                                        else
//                                            alert("not valid");
                                    }

                                });
                            });
                        });
                    });
                });
            });
        });
    }]);

