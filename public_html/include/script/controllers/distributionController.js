/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('DistributionController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {

        //$scope.distribution = new Distribution();
        $.getScript('include/ViewModels/Core/Distribution.js', function () {
            $.getScript('include/ViewModels/Core/Program.js', function () {
                $.getScript('include/ViewModels/Core/Donor.js', function () {

                    $scope.distribution = new Distribution();

                    $('#defaultrange').on('apply.daterangepicker', function (ev, picker) {
                        $scope.distribution.start_date = picker.startDate.format('YYYY-MM-DD');
                        $scope.distribution.end_date = picker.endDate.format('YYYY-MM-DD');
                    });

                    //Programs
                    DataProviderService.getPrograms().success(function (data) {
                        var data = data["data"]["program"];
                        var program = new Program();
                        $scope.programItems = program.parseArray(data);
                    });

                    //Donors            
                    DataProviderService.getDonors().success(function (data) {
                        var data = data["data"]["donor"];
                        var donor = new Donor();
                        $scope.donorItems = donor.parseArray(data);
                    });

                    $scope.$watch('distribution.online', function (newVal, oldVal) {
                        if (newVal != oldVal)
                            if (newVal == true)
                                $('#online-switch').bootstrapSwitch('state', true);
                            else if (newVal == false)
                                $('#online-switch').bootstrapSwitch('state', false);
                    });


                    var id = ($stateParams) ? $stateParams.id : null;
                    if (id) {
                        DataProviderService.getDistributions(id).success(function (data) {
                            var data = data["data"]["distribution"];
                            var distribution = new Distribution();
                            $scope.distribution = distribution.parse(data);

                            // *** Checking dates and filling Date Range Control ***
                            var startDate = new Date($scope.distribution.start_date);
                            var endDate = new Date($scope.distribution.end_date);

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
                            
                            $scope.dateRange = startDateString +  (startDateString == "" && endDateString == "" ? "" : " - ") + endDateString;
                            // ******************************************************
                            
                            SharedPropertiesService.getTree().BulidTreeByDistribution($scope.distribution);
                        });
                    }

                    $scope.Save = function (distribution) {
                        distribution.online = $('#online-switch').bootstrapSwitch("state") == "true" ? 1 : 0;

                        DataProviderService.createDistribution(distribution).success(function (data) {
                            var id = data["data"]["distribution"]["id"];
                            distribution.id = id;
                            SharedPropertiesService.setDistributionId(id);
                            SharedPropertiesService.setDistributionEndDate(distribution.end_date);
                            SharedPropertiesService.getTree().AddDistribution(distribution);
                        });


                    }

                });
            });
        });
    }]);

