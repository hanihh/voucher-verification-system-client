/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('SubdistributionReportController', ['$scope', '$stateParams', '$window', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, $window, DataProviderService, SharedPropertiesService) {
        // *** Build Tree by existing distribution id ***
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
                             return '<button style="width:140px" type="button" class="btn printVouchersBySubdistribution"  url="' + DataProviderService.getPrintVoucherURL("", full.id) + ' ><i class="fa fa-download"></i> Print Vouchers</button>';
                        }}
//                    {"data": "community"}                   
                ]
            },
        });
        
        $("#PrintVouchersByDistribution").live("click", function() {            
            var win = window.open( DataProviderService.getPrintVoucherURL(dist_id, ""), '_blank');
            win.focus();           
        });
        
        $(".printVouchersBySubdistribution").live("click", function(e) {
    
                     var win = window.open(    $(this).attr("url"), '_blank');
            win.focus();
        });
        
    }]);

