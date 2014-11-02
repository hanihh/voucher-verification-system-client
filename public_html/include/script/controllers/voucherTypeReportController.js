/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('VoucherTypeReportController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {
    // *** Build Tree by existing distribution id ***
        var subdist_id = ($stateParams) ? $stateParams.subdist_id : null;
    
        var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                            if (dist_id && SharedPropertiesService.getIsDistributionsView() === false && (SharedPropertiesService.getTreeBuildStatus() === false ||
                                    dist_id !== SharedPropertiesService.getDistributionId())) {       
            SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
        }
        // **********************************************
        var grid = new Datatable();
        grid.init({
            "src": $("#datatable_ajax"),
            // loadingMessage: 'Loading...',
            dataTable: {
                "pageLength": 10, // default record count per page
                "ajax": DataProviderService.getSubdistributionVoucherByFilterURL([["subdistribution_id", subdist_id, "="]]),
                "sAjaxDataProp": "data.distributionVoucher",
                "columns": [
                    {"data": "id"},
                    {"data": "subdistribution.code"},
                    {"data": "type.name"},
                    {"data": "expiration_date"},
                    {"data": "value"},                   
                     {"render": function (data, type, full) {
                                    return "";
                                }}
//                    {"data": "community"}                   
                ]
            },
        });
    }]);

