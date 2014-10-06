/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('subdistributionsController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {
        $scope.subdist = {};

        // Countries
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

        $scope.Save = function (subdist) {
            //sharedProperties.setProperty('Checked');
            TreeProgress.AddSubdistribution(subdist, true);
        }
    }]);

