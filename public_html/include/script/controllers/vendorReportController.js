/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('VendorReportController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {
            // *** Build Tree by existing distribution id ***
                                    var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                                    if ((dist_id && !SharedPropertiesService.getTreeBuildStatus(true)) ||
                                            (dist_id && dist_id != SharedPropertiesService.getDistributionId())) {
                                        SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
                                    }
                                    // **********************************************
        var grid = new Datatable();
        grid.init({
            "src": $("#datatable_ajax"),
            // loadingMessage: 'Loading...',
            dataTable: {
                "pageLength": 10, // default record count per page
                "ajax": DataProviderService.getVendorsMobileByFilterURL([["distribution_id", dist_id, "="]]),
                "sAjaxDataProp": "data.vendorMobile",
                "columns": [
                    {"data": "id"},
                    {"data": "distribution.name"},
                    {"data": "vendor.en_name"},
                    {"data": "vendor.code"},
                    {"data": "phone.imei"},
                    {"data": "distribution.start_date"},
                    {"data": "distribution.end_date"},
                     {"render": function (data, type, full) {
                                    return "";
                                }}
//                    {"data": "community"}                   
                ]
            },
        });
    }]);

