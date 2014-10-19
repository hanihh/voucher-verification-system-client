/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('beneficiaryDistController', ['$scope' ,'WizardViewsService', function ($scope, WizardViewsService) {
        $scope.beneficiary = {};
        $scope.filter = {};


        $.getScript('include/ViewModels/Beneficiary/Beneficiary.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getBeneficiaries().success(function (data) {
                var data = data["data"]["beneficiary"];

                var beneficiary = new Beneficiary();
                $scope.beneficiaries = beneficiary.parseArray(data);


                $('.date-picker').datepicker({
                    rtl: Metronic.isRTL(),
                    autoclose: true
                });

                $('#de_ajax').dataTable({
                    "pageLength": 10, // default record count per page
                    "bProcessing": true,
                    "bServerSide": true,
                    "aoColumns": [
                        {"mData": "registration_code",
                            "mRender": function (data, type, full) {
                                return "<input type='checkbox' class='ChooseCheckBox' value=" + data + " >";
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



                var checkedBenesIds = [];
                $(".ChooseCheckBox").live("click", function () {
                    if ($(this).is(':checked'))
                    {
                        $('#tagsChosen').addTag($(this).attr("value"));
                    } else {
                        $('#tagsChosen').removeTag($(this).attr("value"));
                    }

                });
            });
        });

      
         $scope.Save = function (beneficiary) {

         }


        $scope.Filter = function (filter) {
            console.log(filter);
            /*
             WizardViewsService.getBeneficiaries(filter).success(function (data) {
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