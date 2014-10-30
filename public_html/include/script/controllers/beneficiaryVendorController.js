/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var checkedBenesIds = [];
var addedBenesIds = [];
var canceledBenesIds = [];

app.controller('beneficiaryVendorController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {                                  
        $scope.beneficiary = {};
        $scope.filter = {};
        var vendor_id = ($stateParams) ? $stateParams.vendor_id : null;
        //$scope.subdistributionId = SharedPropertiesService.getSubdistributionIdForBeneficiary();
        $scope.vendorId = vendor_id;

        $.getScript('include/ViewModels/Beneficiary/Beneficiary.js', function ()
        {            
             // *** Build Tree by existing distribution id ***
                var dist_id = ($stateParams) ? $stateParams.dist_id : null;
                if ( dist_id && (SharedPropertiesService.getTreeBuildStatus() === false ||
                        dist_id !== SharedPropertiesService.getDistributionId())) {
                    SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
                }
                // **********************************************
                // 
            // script is now loaded and executed.
            // put your dependent JS here.
            //   DataProviderService.getBeneficiariesBySubdistributionId($scope.subdistributionId).success(function (data) {
            //     var data = data["Beneficiaries"];
            //var beneficiary = new Beneficiary();
//                $scope.beneficiaries = beneficiary.parseArray(data);
            //  $scope.beneficiaries = data;

            $("#tagsChosen").tagsInput({
                'height': '100px',
                'width': '100%',
                'interactive': false,
                'onRemoveTag': function (data) {
                    var checkboxObj = $('#' + data);
                    checkboxObj.attr('checked', false);
                    var checkboxObj_idvalue = checkboxObj.attr('idvalue');
                    checkedBenesIds.pop(checkboxObj_idvalue);
                    if ($.inArray(checkboxObj_idvalue, canceledBenesIds) == -1)
                        canceledBenesIds.push(checkboxObj_idvalue);
                },
            });

            $('.date-picker').datepicker({
                rtl: Metronic.isRTL(),
                autoclose: true
            });

            var dataSource;
            DataProviderService.getBeneficiariesBySubdistributionId($scope.subdistributionId, true, true).success(function (data) {
                var dataProp = "Beneficiaries";
                console.log(data);


                var grid = new Datatable();
                grid.init({
                    "src": $("#datatable_ajax"),
                    // loadingMessage: 'Loading...',

                    dataTable: {              
                        "pageLength": 10, // default record count per page
                        "ajax": DataProviderService.getBeneficiariesBySubdistributionIdURL($scope.subdistributionId, true, false),
                        "sAjaxDataProp": "Beneficiaries",
                        "columns": [
                            {"data": "id",
                                "render": function (data, type, full) {
                                    var checkedAttr = "";
                                    if (full.available == "false")
                                    {
                                        checkedAttr = 'checked';
                                        if ($.inArray(full.id, checkedBenesIds) == -1) {
                                            checkedBenesIds.push(full.id);
                                            addedBenesIds.push(full.id);
                                            $('#tagsChosen').addTag(full.registration_code);
                                        }

                                    } else {
                                        checkedAttr = '';
                                    }
                                    return "<input type='checkbox' class='ChooseCheckBox' id=" + full.registration_code + " idValue = " + full.id + " " + checkedAttr + " >";
                                }
                            },
                            {"data": "registration_code"},
                            {"data": "en_name"},
                            {"data": "father_name"},
                            {"data": "birth_year"},
                            {"render": function (data, type, full) {
                                    return "";
                                }}
                        ]
                    },
                });
            });

            $(".ChooseCheckBox").live("click", function () {
                if ($(this).is(':checked'))
                {
                    $('#tagsChosen').addTag($(this).attr("id"));

                    var idvalue = $(this).attr("idvalue");
                    if ($.inArray(idvalue, canceledBenesIds) != -1) {
                        canceledBenesIds.pop(idvalue);
                    }
                    checkedBenesIds.push($(this).attr("idvalue"));

                    console.log(canceledBenesIds);
                } else {
                    $('#tagsChosen').removeTag($(this).attr("id"));

                    var idvalue = $(this).attr("idvalue");
                    if ($.inArray(idvalue, addedBenesIds) != -1) {
                        canceledBenesIds.push(idvalue);
                    }
                    checkedBenesIds.pop($(this).attr("idvalue"));

                    console.log(canceledBenesIds);
                }
            });
            //});
        });

        $scope.debug = function () {
            console.log(checkedBenesIds);
            console.log(addedBenesIds);
            console.log(canceledBenesIds);
        }
     

        $scope.Save = function () {
            var addObject = $.param({_id: $scope.subdistributionId,
                beneficiaries: checkedBenesIds,
                check_all: 0});
            DataProviderService.createVoucher(addObject).success(function (data) {
                alert(console.log(data));

                if (canceledBenesIds.length != 0) {
                    var cancelObject = $.param({subdistribution_id: $scope.subdistributionId,
                        beneficiaries: canceledBenesIds});
                    DataProviderService.RemoveVoucher(cancelObject).success(function (data) {
                        alert(console.log(data));
                    });
                }

            });
        }

        $scope.Filter = function (filter) {
            console.log(filter);
            /*
             DataProviderService.getBeneficiaries(filter).success(function (data) {
             var data = data["data"]["beneficiary"];
             
             var beneficiary = new Beneficiary();
             $scope.beneficiaries = beneficiary.parseArray(data);
             });
             */
        }
    }]);

function BulidTable(data) {
    var records = [];

    for (i = 0; i < data.length; i++) {
        var rowData = data[i];
        var rowRecord = [
            '<input type="checkbox" class="ChooseCheckBox" name="' + rowData['id'] + '" value="' + rowData['registration_code'] + '"valueName="' + rowData['registration_code'] + '">',
            rowData.registration_code,
            rowData.en_name,
            rowData.father_name,
            rowData.birth_year,
            ''
        ];
        records.push(rowRecord);
    }
    return records;
}