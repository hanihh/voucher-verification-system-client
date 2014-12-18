/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('beneficiaryDistController', ['$scope', '$stateParams', '$state', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, $state, DataProviderService, SharedPropertiesService) {

        $scope.contentTitle.title = "Beneficiaries";

        var checkedBenesIds = [];
        var addedBenesIds = [];
        var canceledBenesIds = [];
//        Metronic.blockUI({
//                    target: $(".portlet-body").closest(".full-height-content-body"),
//                    animate: true,
//                    overlayColor: 'gray'
//                });
        $scope.chooseCheckBoxItems = {};
        $scope.beneficiary = {};
        $scope.filter = {};
        var subdist_id = ($stateParams) ? $stateParams.subdist_id : null;
        //$scope.subdistributionId = SharedPropertiesService.getSubdistributionIdForBeneficiary();
        $scope.subdistributionId = subdist_id;

        $.getScript('include/ViewModels/Beneficiary/Beneficiary.js', function ()
        {
            // *** Build Tree by existing distribution id ***
            var dist_id = ($stateParams) ? $stateParams.dist_id : null;
            if (dist_id && SharedPropertiesService.getIsDistributionsView() === false && (SharedPropertiesService.getTreeBuildStatus() === false ||
                    dist_id !== SharedPropertiesService.getDistributionId())) {
                SharedPropertiesService.getTree().BuildTreeWithDistributionIdByQueryString(dist_id);
            }

            $("#tagsChosen").tagsInput({
                'height': '100px',
                'width': '100%',
                'interactive': false,
                'onRemoveTag': function (data) {
                    var checkboxObj = $('#' + data);
                    // Do not work here because the datatable control is depending on class called "Checked" to check the checkox
                    //checkboxObj.attr('checked', false);
                    checkboxObj.parent("span").removeClass("checked");
                    var checkboxObj_idvalue = checkboxObj.attr('idvalue');
                    checkedBenesIds = RemoveFromArray(checkedBenesIds, checkboxObj_idvalue);
                    if ($.inArray(checkboxObj_idvalue, canceledBenesIds) == -1 && $.inArray(checkboxObj_idvalue, addedBenesIds) > -1)
                        canceledBenesIds.push(checkboxObj_idvalue);
                },
            });

            $('.date-picker').datepicker({
                rtl: Metronic.isRTL(),
                autoclose: true
            });
            
             DataProviderService.getBeneficiariesBySubdistributionId($scope.subdistributionId, true, true).success(function(data){
                   $("#datatable_ajax").dataTable({
       
                         "sAjaxSource":data
                    });
             });
            
          
            /*
             var grid = new Datatable();
             grid.init({
             "src": $("#datatable_ajax"),
             // loadingMessage: 'Loading...',
             onSuccess: function (grid) {
             // execute some code after table records loaded
             alert(1);
             var item = $("#portlet-body").closest(".full-height-content-body");
             Metronic.unblockUI(item);
             },
             dataTable: {
             "pageLength": 10, // default record count per page
             "ajax": DataProviderService.getBeneficiariesBySubdistributionIdURL($scope.subdistributionId, true, true),
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
             */
            /*
            var grid = new Datatable();
            grid.init({
                "src": $("#datatable_ajax"),
                onSuccess: function (grid) {
                    // execute some code after table records loaded
                },
                onError: function (grid) {
                    // execute some code on network or other general error  
                },
                loadingMessage: 'Loading...',
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                "bProcessing": true,
                "bServerSide": true,
                paging: true,
                dataTable: {
                    paging: true,
                    "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                    "bProcessing": true,
                    "bServerSide": true,
                    "processing": true,
                    "serverSide": true,
                    "lengthMenu": [
                        [5, 15, 20, -1],
                        [5, 15, 20, "All"] // change per page values here
                    ],
                    // set the initial value
                    "pageLength": 5,
                    "pagingType": "bootstrap_extended",
                    "language": {
                        processing: "Traitement en cours...",
                        search: "Rechercher&nbsp;:",
                        lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
                        info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                        infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
                        infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                        infoPostFix: "",
                        loadingRecords: "Chargement en cours...",
                        zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
                        emptyTable: "Aucune donnée disponible dans le tableau",
                        paginate: {
                            first: "Premier",
                            previous: "Pr&eacute;c&eacute;dent",
                            next: "Suivant",
                            last: "Dernier"
                        },
                        aria: {
                            sortAscending: ": activer pour trier la colonne par ordre croissant",
                            sortDescending: ": activer pour trier la colonne par ordre décroissant"
                        }
                    },
                    //"ajax": DataProviderService.getBeneficiariesBySubdistributionIdURL($scope.subdistributionId, true, true),
                    aaData: [[1, "CFW0009", "Mustafa Kabawa", "Mustafa Kabawa", "2014"]],
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
                    ],
                    "orderCellsTop": true,
                    "pagingType": "bootstrap_extended",
                },
            });
*/
            $scope.chooseCheckBoxItems = $(".ChooseCheckBox");
            $scope.chooseCheckBoxItems.die("click");
            $scope.chooseCheckBoxItems.live("click", function () {
                if ($(this).is(':checked'))
                {
                    $('#tagsChosen').addTag($(this).attr("id"));

                    var idvalue = $(this).attr("idvalue");
                    if ($.inArray(idvalue, canceledBenesIds) != -1) {
                        checkedBenesIds = RemoveFromArray(checkedBenesIds, idvalue);
                    }
                    checkedBenesIds.push($(this).attr("idvalue"));
                } else {
                    $('#tagsChosen').removeTag($(this).attr("id"));

//                    var idvalue = $(this).attr("idvalue");
//                    if ($.inArray(idvalue, addedBenesIds) != -1) {
//                        canceledBenesIds.push(idvalue);
//                    }
//                    checkedBenesIds.pop($(this).attr("idvalue"));
                }
            });
        });

        $scope.debug = function () {
            console.log(checkedBenesIds);
            console.log(addedBenesIds);
            console.log(canceledBenesIds);
        }



        $scope.Save = function () {
            var addObject = $.param({subdistribution_id: $scope.subdistributionId,
                beneficiaries: checkedBenesIds,
                check_all: 0});
            DataProviderService.createVoucher(addObject).success(function (data) {
                if (canceledBenesIds.length != 0) {
                    var cancelObject = $.param({subdistribution_id: $scope.subdistributionId,
                        beneficiaries: canceledBenesIds});
                    DataProviderService.RemoveVoucher(cancelObject).success(function (data) {
                        toastr.success('Beneficiaries have been deleted successfully!');
                    });
                }
                toastr.success('Beneficiaries have been added successfully!');
            });
        }

        $scope.Reset = function () {
            $state.transitionTo($state.current, angular.copy($stateParams), {reload: true, inherit: true, notify: true});
            toastr.warning('Form has been reset!');
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
