/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('ViewVendorsController', ['$scope', 'DataProviderService', 'SharedPropertiesService', function ($scope, DataProviderService, SharedPropertiesService) {

        $scope.TriggerViewVendorsState = function () {
            var grid = new Datatable();
            grid.init({
                "src": $("#datatable_ajax"),
                // loadingMessage: 'Loading...',
                dataTable: {
                    "pageLength": 10, // default record count per page
                    "ajax": DataProviderService.getVendorsURL(),
                    "sAjaxDataProp": "data.vendor",
                    "columns": [
                        {"data": "id"},
                        {"data": "en_name"},
                        {"data": "ar_name"},
                        {"data": "code"},
                        {"data": "type.name"},
                         {"data": "status.name"},
                        {
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

        $scope.TriggerViewVendorsState();
    }]);


    