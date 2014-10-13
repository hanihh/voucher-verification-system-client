/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('DistributionController', ['$scope', '$rootScope', 'WizardViewsService', 'SharedPropertiesService', function ($scope, $rootScope, WizardViewsService, SharedPropertiesService) {
        //$scope.distribution = new Distribution();
        $.getScript('include/ViewModels/Core/Distribution.js', function () {
        });
        $.getScript('include/ViewModels/Core/Program.js', function () {
        });
        $.getScript('include/ViewModels/Core/Donor.js', function () {
        });

        //Programs
        WizardViewsService.getPrograms().success(function (data) {
            var data = data["data"]["program"];
            var program = new Program();
            $scope.programItems = program.parseArray(data);
        });

        //Donors            
        WizardViewsService.getDonors().success(function (data) {
            var data = data["data"]["donor"];
            var donor = new Donor();
            $scope.donorItems = donor.parseArray(data);
        });


        $scope.$watch('distribution.online', function (newVal, oldVal) {
            console.log(newVal);

        });

        $scope.Save = function (distribution) {
            //console.log(distribution);
            SharedPropertiesService.getTree().AddDistributions();
            //Id should be from the post's returning value
            var id = 1;
            SharedPropertiesService.setDistributionId(id);
        }
    }]);

