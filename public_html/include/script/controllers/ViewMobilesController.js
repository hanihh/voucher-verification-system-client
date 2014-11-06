/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('ViewMobilesController', ['$scope', 'DataProviderService', 'SharedPropertiesService', function ($scope, DataProviderService, SharedPropertiesService) {

        $scope.TriggerViewMobilesState = function () {
            var grid = new Datatable();
            grid.init({
                "src": $("#datatable_ajax"),
                // loadingMessage: 'Loading...',
                dataTable: {
                    "pageLength": 10, // default record count per page
                    "ajax": DataProviderService.getPhonesURL(),
                    "sAjaxDataProp": "data.phone",
                    "columns": [
                        {"data": "id"},
                        {"data": "model"},
                        {"data": "imei"},
                        {"data": "available", 
                         "render": function (data, type, full) {
                                return full.available === "1" ? "Yes" : "No";
                            }
                        },{
                            "render": function (data, type, full) {
                                return '<button style="width:140px" type="button" class="btn yellow printVouchersBySubdistribution"  url="' + DataProviderService.getPrintVoucherURL("", full.id) + '"><i class="fa fa-pencil-square-o"></i> Edit</button>';
                            }
                        }
//                        {"data": "vendorMobiles[0].vendor_id"},
//                        {"data": "vendorMobiles[0].distribution_id"}                                         
                    ]
                },
            });
        }
        $scope.TriggerViewMobilesState();
    }]);


    