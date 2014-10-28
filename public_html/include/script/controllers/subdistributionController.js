/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('subdistributionController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {
        //Initializing Models for cascade select lists
        $.getScript('include/ViewModels/Core/Subdistribution.js', function () {
            $.getScript('include/ViewModels/Core/Distribution_status.js', function () {
                $.getScript('include/ViewModels/Location/Country.js', function () {
                    $.getScript('include/ViewModels/Location/Governorate.js', function () {
                        $.getScript('include/ViewModels/Location/District.js', function () {
                            $.getScript('include/ViewModels/Location/Subdistrict.js', function () {
                                $.getScript('include/ViewModels/Location/Community.js', function () {
                                    $scope.subdistributionNameLocation = "";
                                    $scope.subdistributionDatePart = "";
                                    console.log("SUb");
                                    $scope.country = null;
                                    $scope.governorate = null;
                                    $scope.district = null;
                                    $scope.subdistrict = null;
                                    $scope.subdistribution = new Subdistribution();
                                    $scope.subdistribution.end_date= SharedPropertiesService.getDistributionEndDate();
                                    $scope.subdistribution.start_date = SharedPropertiesService.getDistributionStartDate();
                                    $("#status").val("Active");
                                    $scope.subdistribution.status_id = 2;
                                    console.log($scope.subdistribution);

                                    $('#defaultrange').daterangepicker({
                                        opens: (Metronic.isRTL() ? 'left' : 'right'),
                                        format: 'YYYY-MM-DD',
                                        separator: ' to ',
                                        startDate: moment(),
                                        endDate: moment().add('days', 1),
                                        minDate: moment(),
                                        maxDate: new Date($scope.subdistribution.end_date)
                                    },
                                            function (start, end) {
                                                console.log(start.format('YYYY-MM-DD'));
                                                console.log(end.format('YYYY-MM-DD'));
                                                $('#defaultrange input').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                                                UpdateStatus(start, end);
                                                var datetime = start.format('YYYY-MM-DD');
                                                var dateParts = datetime.split("-");
                                                $scope.subdistributionDatePart = dateParts[1] + "-" + dateParts[2];
                                                $scope.subdistribution.code = $scope.subdistributionNameLocation + "-" + $scope.subdistributionDatePart;
                                                $("#subdistribution_code").val($scope.subdistribution.code);
                                            }
                                    );

                                    //$('#defaultrange').on('apply.daterangepicker', function (ev, picker) {
                                    function UpdateStatus(startDate, endDate) {
                                        $scope.subdistribution.start_date = startDate.format('YYYY-MM-DD');
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

                                        $scope.subdistribution.end_date = endDate.format('YYYY-MM-DD');
                                    }
                                    //});

                                    //--- Watching cascade select lists models ---//
                                    $scope.$watch('country', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {                  
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
                                                                       
                                            $('#s2id_governorateList > a > span:first').html("");
                                                       
                                        }
                                    });

                                    $scope.$watch('governorate', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
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
                                            
                                                 $('#s2id_districtList > a > span:first').html("");                                                           
                                        }
                                    });

                                    $scope.$watch('district', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            $scope.subdistrictItems = null;
                                            $scope.subdistrict = null;
                                            // Subdistricts
                                            DataProviderService.getSubdistrictsByFilter([['district_id', newVal.id, '=']]).success(function (data) {
                                                var data = data["data"]["subdistrict"];

                                                $scope.subdistrictItems = data;
                                                //console.log( $scope.subdistrictItems);
                                            });
                                            $scope.subdistribution.community_id = null;
                                            
                                             $('#s2id_subdistrictList > a > span:first').html("");
                                                           
                                        }
                                    });

                                    $scope.$watch('subdistrict', function (newVal, oldVal) {
                                        if (newVal != oldVal)
                                        {
                                            $scope.communityItems = null;
                                            $scope.community = null;
                                            // Communities
                                            DataProviderService.getCommunitiesByFilter([['subdistrict_id', newVal.id, '=']]).success(function (data) {
                                                var data = data["data"]["community"];

                                                $scope.communityItems = data;
                                                //console.log( $scope.communityItems);
                                                
                                            });
                                            
                                             $('#s2id_communityList > a > span:first').html("");
                                        }
                                    });

                                    // ------------------------------------------------ //


                                    DataProviderService.getCountries().success(function (data) {
                                        var data = data["data"]["country"];
                                        //var country = new Country();
                                        //$scope.countryItems = country.parseArray(data);
                                        $scope.countryItems = data;
                                        //console.log( $scope.countryItems);
                                    });
                                    
                                    DataProviderService.getCommunities().success(function (data) {
                                        var data = data["data"]["community"];
                                        $scope.communityItems = data;
                                        //console.log( $scope.communityItems);
                                    });
                                    
                                    $scope.$watch('subdistribution.community_id', function (newVal, oldVal) {
                                        console.log($scope.communityItems);
                                        if (newVal != oldVal) {
                                            if (newVal != null) {
                                                if ($scope.communityItems != null) {
                                                    $scope.communityItems.forEach(function (entry) {
                                                        if (entry.id == newVal)
                                                            $scope.subdistributionNameLocation = entry.code;
                                                            $scope.subdistribution.code = $scope.subdistributionNameLocation + "-" + $scope.subdistributionDatePart;
                                                    });
                                                } else {

                                                }
                                            }
                                        }
                                    });
                                    
                                    // Status
                                    DataProviderService.getStatus().success(function (data) {
                                        var data = data["data"]["distributionStatus"];
                                        var distribution_status = new Distribution_status();
                                        $scope.statusItems = distribution_status.parseArray(data);
                                    });

                                    var id = ($stateParams) ? $stateParams.subdist_id : null;
                                    var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                                    if (id)
                                    {
                                        DataProviderService.getSubdistributions(id).success(function (data) {
                                            var data = data["data"]["subdistribution"];
                                            var subdistribution = new Subdistribution();
                                            $scope.subdistribution = subdistribution.parse(data);
                                            var community = data["community"];
                                            $scope.status = data["status"].name;
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
                
//                                                            $scope.country = country;
//                                                            $scope.governorate = governorate;
//                                                            $scope.district = district;
//                                                            $scope.subdistrict = subdistrict;
                                                            $scope.subdistribution.community_id = community.id;

                                                            $('#s2id_countryList > a > span:first').html(country.name);
                                                            $('#s2id_governorateList > a > span:first').html(governorate.en_name);
                                                            $('#s2id_districtList > a > span:first').html(district.en_name);
                                                            $('#s2id_subdistrictList > a > span:first').html(subdistrict.en_name);
                                                            $('#s2id_communityList > a > span:first').html(community.en_name);

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
                                            
                                            
                                             
                                            if (dist_id && !SharedPropertiesService.getTreeBuildStatus(true)){
                                                SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
                                                SharedPropertiesService.getTree().SelectTreeNodeByWizardModel({subdistribution:  $scope.subdistribution});
                                            }
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
                                            SharedPropertiesService.getTree().AddSubdistribution(subdistribution, false);
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

