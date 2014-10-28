/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('SubdistributionReportController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {
        var distId = SharedPropertiesService.getDistributionId();   
        var grid = new Datatable();
        grid.init({
            "src": $("#datatable_ajax"),
            // loadingMessage: 'Loading...',
            dataTable: {
                "pageLength": 10, // default record count per page
                "ajax": DataProviderService.getSubdistributionsByFilterURL([["distribution_id", distId, "="]]),
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

