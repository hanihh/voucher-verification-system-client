/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
            var checkedBenesIds = [];


//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('beneficiaryDistController', ['$scope', 'DataProviderService','SharedPropertiesService', function ($scope, DataProviderService, SharedPropertiesService) {
        $scope.beneficiary = {};
        $scope.filter = {};

        $.getScript('include/ViewModels/Beneficiary/Beneficiary.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            DataProviderService.getBeneficiaries().success(function (data) {
                var data = data["data"]["beneficiary"];

                var beneficiary = new Beneficiary();
                $scope.beneficiaries = beneficiary.parseArray(data);


                $('.date-picker').datepicker({
                    rtl: Metronic.isRTL(),
                    autoclose: true
                });
                
                
                $('#datatable_ajax').dataTable({
                    "pageLength": 10, // default record count per page
                    "bProcessing": true,
                    "bServerSide": true,
                    "aoColumns": [
                        {"mData": "registration_code",
                            "mRender": function (data, type, full) {
                                //return "<input type='checkbox' class='ChooseCheckBox' value=" + data + " idValue=" + data + " >";
                                           return "<input type='checkbox' class='ChooseCheckBox' value=" + full.registration_code + " idValue = " + full.id + " >";
                            }},
                        {"mData": "registration_code"},
                        {"mData": "en_name"},
                        {"mData": "father_name"},
                        {"mData": "birth_year"},
                        {"mRender": function (data, type, full) {
                                return "";
                            }}
                    ],
                    "sAjaxSource": "http://localhost:8080/vvs_v2/index.php/api/Beneficiary",
                    "sServerMethod": "GET",
                    "sAjaxDataProp": "data.beneficiary",
                    "contentType": "application/json; charset=utf-8",
                    "dataType": "json",
                    "order": [
                        [1, "asc"]
                    ] // set first column as a default s
                });



    
                $(".ChooseCheckBox").live("click", function () {
                    if ($(this).is(':checked'))
                    {
                        $('#tagsChosen').addTag($(this).attr("value"));
                        checkedBenesIds.push( $(this).attr("idvalue"));
                    } else {
                        $('#tagsChosen').removeTag($(this).attr("value"));
                        checkedBenesIds.pop( $(this).attr("idvalue"));
                    }
                });
            });
        });


        $scope.Save = function () {
            var subdistributionId = SharedPropertiesService.getSubdistributionIdForBeneficiary();
//            var object = {
//                "subdistribution_id": subdistributionId,
//                "beneficiaries": checkedBenesIds, 
//                "check_all":0
//            };
            var object = $.param({ subdistribution_id: subdistributionId,
                beneficiaries: checkedBenesIds, 
                check_all:0});
            DataProviderService.createVoucher(object).success(function(){
                alert("Success");
            })
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


/*
 * Old Code           
                var grid = new Datatable();
                grid.init({
                    "src": $("#datatable_ajax"),
                    dataTable: {
                            "DataProp": "data.beneficiary",
                        "pageLength": 10, // default record count per page
                        //"bProcessing": true,
                        //"bServerSide": true,
                        "processing": false, // enable/disable display message box on record load
                        "serverSide": false, // enable/disable server side ajax loading
//
//                        "aoColumns": [
//                            {"mData": "registration_code",
//                                "mRender": function (data, type, full) {
//                                    return "<input type='checkbox' class='ChooseCheckBox' value=" + data + " >";
//                                }},
//                            {"mData": "registration_code"},
//                            {"mData": "en_name"},
//                            {"mData": "father_name"},
//                            {"mData": "birth_year"},
//                            {"mRender": function (data, type, full) {
//                                    return "";
//                                }}
//                        ],
                        //"sAjaxSource": "http://localhost:8080/vvs_v2/index.php/api/Beneficiary",
                        "ajax": {
                            "url": "http://localhost:8080/vvs_v2/index.php/api/Beneficiary",
                            "type": "GET",        
                            "DataProp": "data.beneficiary",
                           //  "contentType": "application/json; charset=utf-8",
                              //      "dataType": "json",
                             columns: [{
                                field: 'state',
                                checkbox: true
                            }, {
                                field: 'data.beneficiary.registration_code',
                                title: 'registration_code',
                                align: 'right',
                                valign: 'bottom',
                                sortable: true
                            }, {
                                field: 'data.beneficiary.en_name',
                                title: 'en_name',
                                align: 'center',
                                valign: 'middle',
                                sortable: true,
     
                            }, {
                                field: 'data.beneficiary.father_name',
                                title: 'father_name',
                                align: 'left',
                                valign: 'top',
                                sortable: true,
                 
                            }, {
                                field: 'data.beneficiary.birth_year',
                                title: 'birth_year',
                                align: 'left',
                                valign: 'top',
                                sortable: true,
                            }]                            
                        },
                        //"sServerMethod": "GET",
                        "sAjaxDataProp": "data.beneficiary",
                        "contentType": "application/json; charset=utf-8",
                        "dataType": "json",
                        "order": [
                            [1, "asc"]
                        ] // set first column as a default s
                    },
                });
 
 */