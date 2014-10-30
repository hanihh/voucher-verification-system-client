/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('SubdistributionReportController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {
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
                "ajax": DataProviderService.getSubdistributionsByFilterURL([["distribution_id", dist_id, "="]]),
                "sAjaxDataProp": "data.subdistribution",
                "columns": [
                    {"data": "id"},
                    {"data": "code"},
                    {"data": "distribution.name"},
                    {"data": "community.en_name"},
                    {"data": "status.name"},
                    {"data": "start_date"},
                    {"data": "end_date"},
                    {"data": "note"},
                     {"render": function (data, type, full) {
                                    return "";
                                }}
//                    {"data": "community"}                   
                ]
            },
        });
    }]);

