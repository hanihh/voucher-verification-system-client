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
                    $scope.distributionNameProgramPart = "";
                    $scope.distributionDatePart = "";
                    $('#defaultrange').daterangepicker({
                        opens: (Metronic.isRTL() ? 'left' : 'right'),
                        format: 'YYYY-MM-DD',
                        separator: ' to ',
                        startDate: moment(),
                        endDate: moment().add('days', 1),
                        minDate: moment().add('days', -1),
                    },
                            function (start, end) {
                                $scope.distribution.start_date = start.format('YYYY-MM-DD');
                                console.log($scope.distribution.start_date);
                                $scope.distribution.end_date = end.format('YYYY-MM-DD');
                                $('#defaultrange input').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                                var datetime = start.format('YYYY-MM-DD');
                                var dateParts = datetime.split("-");
                                $scope.distributionDatePart = dateParts[1] + "-" + dateParts[2];
                                $scope.distribution.name = $scope.distributionNameProgramPart + "-" + $scope.distributionDatePart;
                                $("#distribution_name").val($scope.distribution.name);
                                //var distributionNameParts = distributionName.split("-");

                            }
                    );
                    /*
                     $('#defaultrange').on('apply.daterangepicker', function (ev, picker) {
                     $scope.distribution.start_date = picker.startDate.format('YYYY-MM-DD');
                     $scope.distribution.end_date = picker.endDate.format('YYYY-MM-DD');
                     });
                     */


                    //Programs
                    DataProviderService.getPrograms().success(function (data) {
                        var data = data["data"]["program"];
                        var program = new Program();
                        $scope.programItems = program.parseArray(data);
                        console.log( $scope.programItems);
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

                    $scope.$watch('distribution.program_id', function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            if (newVal != null) {
//                                $scope.programItems.forEach(function (entry) {
//                                    if (entry.id == newVal)
//                                        $scope.distributionNameProgramPart = entry.code;
//                                        $scope.distribution.name = $scope.distributionNameProgramPart + "-" + $scope.distributionDatePart;
//                                });
                            }
                        }
                    });

                    $scope.$watch('distribution.start_date', function (newVal, oldVal) {
                        if (newVal != oldVal) {

                        }
                    });


                    var id = ($stateParams) ? $stateParams.dist_id : null;
                    if (id) {
                        DataProviderService.getDistributions(id).success(function (data) {
                            var data = data["data"]["distribution"];
                            var distribution = new Distribution();
                            $scope.distribution = distribution.parse(data);

                            $('#s2id_programList > a > span:first').html(data.program.name);
                            $('#s2id_donorList > a > span:first').html(data.donor.name);

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
                            
                            var dateParts = $scope.distribution.start_date.split(" ");
                            dateParts = dateParts[0] .split("-");
                            $scope.distributionDatePart = dateParts[1] + "-" + dateParts[2];
                            $scope.dateRange = startDateString + (startDateString == "" && endDateString == "" ? "" : " - ") + endDateString;
                            // ******************************************************
                            SharedPropertiesService.setDistributionId(id);
                            SharedPropertiesService.getTree().BulidTreeByDistribution($scope.distribution);
//                            $scope.programItems.forEach(function (entry) {
//                                if (entry.id == $scope.distribution.program_id)
//                                    $scope.distributionNameProgramPart = entry.code;
//                            });
                        });
                    }

                    $scope.Save = function (distribution) {
                        distribution.online = $('#online-switch').bootstrapSwitch("state") == "true" ? 1 : 0;
                        if (distribution.id == null) {
                            DataProviderService.createDistribution(distribution).success(function (data) {
                            var id = data["data"]["distribution"]["id"];
                            distribution.id = id;
                            SharedPropertiesService.setDistributionId(id);
                            SharedPropertiesService.setDistributionStatus(distribution.online);
                            SharedPropertiesService.setDistributionEndDate(distribution.end_date);
                            SharedPropertiesService.getTree().AddDistribution(distribution, false);
                        });
                        } else {
                            DataProviderService.updateDistribution(distribution).success(function (data) {
                            var id = data["data"]["distribution"]["id"];
                            distribution.id = id;
                            SharedPropertiesService.setDistributionId(id);
                            SharedPropertiesService.setDistributionStatus(distribution.online);
                            SharedPropertiesService.setDistributionEndDate(distribution.end_date);
                            SharedPropertiesService.getTree().AddDistribution(distribution);
                        });
                        }

                    }

                });
            });
        });
    }]);

