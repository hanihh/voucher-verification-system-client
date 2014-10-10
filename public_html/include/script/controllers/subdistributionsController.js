/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('subdistributionsController', ['$scope', '$stateParams', 'WizardViewsService', function ($scope, $stateParams, WizardViewsService) {
        //Initializing Models for cascade select lists

        $.getScript('include/ViewModels/Core/Subdistribution.js', function () {
        });
        $.getScript('include/ViewModels/Location/Country.js', function () {
        });
        $.getScript('include/ViewModels/Location/Governorate.js', function () {
        });
        $.getScript('include/ViewModels/Location/District.js', function () {
        });
        $.getScript('include/ViewModels/Location/Subdistrict.js', function () {
        });
        $.getScript('include/ViewModels/Location/Community.js', function () {
        });

            var id = $stateParams.id;
        $scope.subdist = {};

        $scope.country = {
            id: 0
        };
        $scope.governorate = {
            id: 0
        };
        $scope.district = {
            id: 0
        };
        $scope.subdistrict = {
            id: 0
        };
        $scope.community = {
            id: 0
        };

        //--- Watching cascade select lists models ---//
        $scope.$watch('country', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.governorate = {};
                $scope.district = {};
                $scope.subdistrict = {};
                $scope.community = {};
                $scope.governorate = {
                    id: 0
                };
                $scope.district = {
                    id: 0
                };
                $scope.subdistrict = {
                    id: 0
                };
                $scope.community = {
                    id: 0
                };
            }
        });

        $scope.$watch('governorate', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.district = {};
                $scope.subdistrict = {};
                $scope.community = {};
                $scope.district = {
                    id: 0
                };
                $scope.subdistrict = {
                    id: 0
                };
                $scope.community = {
                    id: 0
                };
            }
        });

        $scope.$watch('district', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.subdistrict = {};
                $scope.community = {};
                $scope.subdistrict = {
                    id: 0
                };
                $scope.community = {
                    id: 0
                };
            }
        });

        $scope.$watch('subdistrict', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.community = {};
                $scope.community = {
                    id: 0
                };
            }
        });
        // ------------------------------------------------ //


        WizardViewsService.getCountries().success(function (data) {
            var data = data["data"]["country"];
            var country = new Country();
            $scope.countryItems = country.parseArray(data);
        });

        // Governorates
        WizardViewsService.getGovernorates().success(function (data) {
            var data = data["data"]["governorate"];
            var governorate = new Governorate();
            $scope.governorateItems = governorate.parseArray(data);
        });

        // Districts
        WizardViewsService.getDistricts().success(function (data) {
            var data = data["data"]["district"];
            var district = new District();
            $scope.districtItems = district.parseArray(data);
        });

        // Subdistricts
        WizardViewsService.getSubdistricts().success(function (data) {
            var data = data["data"]["subdistrict"];
            var subdistrict = new Subdistrict();
            $scope.subdistrictItems = subdistrict.parseArray(data);
        });

        // Communities
        WizardViewsService.getCommunities().success(function (data) {
            var data = data["data"]["community"];
            var community = new Community();
            $scope.communityItems = community.parseArray(data);
        });


        if (id)
        {
            WizardViewsService.getSubdistributions(id).success(function (data) {
                var data = data["data"]["subdistribution"];
                var subdistribution = new Subdistribution();
                $scope.subdist = subdistribution.parse(data);
                var community = $scope.subdist.community;



                // Subdistricts
                WizardViewsService.getSubdistricts(community["subdistrict_id"]).success(function (data) {
                    var data = data["data"]["subdistrict"];


                    var subdistrict = new Subdistrict();
                    var subdistrict = subdistrict.parse(data);


                    // Districts
                    WizardViewsService.getDistricts(subdistrict["district_id"]).success(function (data) {
                        var data = data["data"]["district"];
                        var district = new District();
                        var district = district.parse(data);

                        // Governorates
                        WizardViewsService.getGovernorates(district["governorate_id"]).success(function (data) {
                            var data = data["data"]["governorate"];
                            var governorate = new Governorate();
                            var governorate = governorate.parse(data);


                            WizardViewsService.getCountries(governorate["country_id"]).success(function (data) {
                                var data = data["data"]["country"];
                                var country = new Country();
                                var country = country.parse(data);

                                $scope.country = country;
                                $scope.governorate = governorate;
                                $scope.district = district;
                                $scope.subdistrict = subdistrict;
                                $scope.community = community;
                            });
                        });
                    });
                });






                // Countries



            });
        }


        $scope.Save = function (subdist) {
            //sharedProperties.setProperty('Checked');
            TreeProgress.AddSubdistribution(subdist, true);
        }
    }]);

