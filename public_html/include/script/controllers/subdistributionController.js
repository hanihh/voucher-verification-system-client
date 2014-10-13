/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('subdistributionController', ['$scope', '$stateParams', 'WizardViewsService', 'SharedPropertiesService', function ($scope, $stateParams, WizardViewsService, SharedPropertiesService) {
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

        //var id = ($stateParams) ? $stateParams.id : null;
        $scope.subdistribution = {
            code:"",
            date:"",           
            country: {id: 0},
            governorate: {id: 0},
            district: {id: 0},
            subdistrict: {id: 0},
            community: {id: 0}
        };

        //--- Watching cascade select lists models ---//
        $scope.$watch('subdistribution.country', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.subdistribution.governorate = {};
                $scope.subdistribution.district = {};
                $scope.subdistribution.subdistrict = {};
                $scope.subdistribution.community = {};
                $scope.subdistribution.governorate = {
                    id: 0
                };
                $scope.subdistribution.district = {
                    id: 0
                };
                $scope.subdistribution.subdistrict = {
                    id: 0
                };
                $scope.subdistribution.community = {
                    id: 0
                };
            }
        });

        $scope.$watch('subdistribution.governorate', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.subdistribution.district = {};
                $scope.subdistribution.subdistrict = {};
                $scope.subdistribution.community = {};
                $scope.subdistribution.district = {
                    id: 0
                };
                $scope.subdistribution.subdistrict = {
                    id: 0
                };
                $scope.subdistribution.community = {
                    id: 0
                };
            }
        });

        $scope.$watch('subdistribution.district', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.subdistribution.subdistrict = {};
                $scope.subdistribution.community = {};
                $scope.subdistribution.subdistrict = {
                    id: 0
                };
                $scope.subdistribution.community = {
                    id: 0
                };
            }
        });

        $scope.$watch('subdistribution.subdistrict', function (newVal, oldVal) {
            if (newVal != oldVal)
            {
                $scope.subdistribution.community = {};
                $scope.subdistribution.community = {
                    id: 0
                };
            }
        });
        // ------------------------------------------------ //


        WizardViewsService.getCountries().success(function (data) {
            var data = data["data"]["country"];
            console.log(data);
            var country = new Country();
            $scope.countryItems = country.parseArray(data);
        });

        // Governorates
        WizardViewsService.getGovernorates().success(function (data) {
            var data = data["data"]["governorate"];
            console.log(data);
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

        /*
         if (id)
         {
         WizardViewsService.getSubdistributions(id).success(function (data) {
         var data = data["data"]["subdistribution"];
         var subdistribution = new Subdistribution();
         $scope.subdistribution = subdistribution.parse(data);
         var community = $scope.subdistribution.community;
         
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
         
         $scope.subdistribution.country = country;
         $scope.subdistribution.governorate = governorate;
         $scope.subdistribution.district = district;
         $scope.subdistribution.subdistrict = subdistrict;
         $scope.subdistribution.community = community;
         
         //                                console.log($scope.country );
         //                                console.log($scope.governorate) ;
         //                                console.log($scope.district );
         //                                console.log($scope.subdistrict) ;
         //                                console.log($scope.community );
         
         
         });
         });
         });
         });
         
         
         
         
         
         
         
         
         
         
         });
         }
         */

        $scope.Save = function (subdistribution) {
            var model = {         
                code: subdistribution.code,
                note: subdistribution.note,
                //start_date: subdistribution.start_date,
                //end_date: subdistribution.end_date,
                start_date: "2014",
                end_date: "2015",
                status_id: "4", //Pending
                community_id: subdistribution.community.id,
                distribution_id: SharedPropertiesService.getDistributionId()
            }
           
            WizardViewsService.createSubDistribution(model).success(function (data) {
                  var id = data["data"]["subdistribution"]["id"];
                  model.id = id;
                  SharedPropertiesService.getTree().AddSubdistribution(model);
            });
                           
         
        }
    }]);

