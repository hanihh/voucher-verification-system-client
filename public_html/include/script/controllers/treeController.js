/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CreateNode(id, text, icon) {
    return {
        id: id,
        text: text,
        icon: icon
    };
}

function SetNodeRoute(node, url, param, tag) {
    if (param)
    {
        //In the ui-sref dynamic situation, we should add the parameter to the ui-sref like that: 
        //node.a_attr["ui-sref"]= url + ({ key:value }) 
        node.a_attr["ui-sref-param"] = param;
    }
        node.a_attr["ui-sref"] = url;
        node.a_attr["ui-sref-tag"] = tag;
}

app.controller("TreeController", ['$scope', '$state', 'DataProviderService', 'SharedPropertiesService', function ($scope, $state, DataProviderService, SharedPropertiesService) {

        var $WizardTree = {
            $tree: {},
            //Should be on lower case to match the routing states
            distributionsId: "distributions",
            dist_id: null,            
            distributionsNode: "",
            subdistributionsId: "subdistributions",
            subdistributionsNode: "",
            addNewSubdistributionsId: "subdistribution",
            vendorsId: "vendors",
            vendorsNode: "",
            addNewVendorsId: "vendor",
            __Init: function (_tree) {
                tree = _tree;
                tree.jstree(true).create_node(tree, CreateNode(this.distributionsId, "Add Distribution", "fa fa-plus-circle icon-state-danger"));
                distributionsNode = tree.jstree(true).get_node(this.distributionsId);
               //  tree.jstree(true).select_node(this.distributionsId);                
                SetNodeRoute(distributionsNode, "distributions", "", "Add New Distribution");
            },
            __Clear: function () {
                tree.jstree(true).delete_node(distributionsNode);
            },
            AddDistribution: function (distribution, WithSelectMethodology) {
                dist_id = distribution.id;
                tree.jstree(true).delete_node(distributionsNode);
                this.distributionsId = distribution.id + "dist";
                tree.jstree(true).create_node(tree, CreateNode(this.distributionsId, distribution.name, "fa fa-cube"));
                distributionsNode = tree.jstree(true).get_node(this.distributionsId);
                SetNodeRoute(distributionsNode, "distributions", {dist_id: dist_id}, "Distribution: " + distribution.name);

                tree.jstree(true).create_node(distributionsNode, CreateNode(this.subdistributionsId, "Subdistributions", "fa fa-cubes icon-state-warning"));
                subdistributionsNode = tree.jstree(true).get_node(this.subdistributionsId);
                SetNodeRoute(subdistributionsNode, "subdistributionsreport", {dist_id: dist_id}, "Subdistributions");

                tree.jstree(true).create_node(subdistributionsNode, CreateNode(this.addNewSubdistributionsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(this.addNewSubdistributionsId), "subdistribution", {dist_id: dist_id, subdist_id: ""}, "Add New Subdistribution");

                //this.LoadSubdistributions();

                tree.jstree(true).create_node(distributionsNode, CreateNode(this.vendorsId, "Vendors", "fa fa-building icon-state-warning"));
                vendorsNode = tree.jstree(true).get_node(this.vendorsId);
                SetNodeRoute(vendorsNode, "vendorreport", {dist_id: dist_id}, "Vendors");

                tree.jstree(true).create_node(vendorsNode, CreateNode(this.addNewVendorsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(this.addNewVendorsId), "vendor", {dist_id: dist_id , vendor_id: ""}, "Add New Vendor");

                tree.jstree(true).open_node(distributionsNode, false);
                tree.jstree(true).open_node(subdistributionsNode, false);
                tree.jstree(true).open_node(vendorsNode, false);
                if (WithSelectMethodology) {
                    tree.jstree(true).deselect_node(tree.jstree(true).get_selected(true)[0]);
                    tree.jstree(true).select_node(this.distributionsId);
                }
//                tree.jstree(true).select_node(nodeObject.name + "Types" + "AddNew");
            },
            AddSubdistribution: function (subdistribution, WithSelectMethodology) {
                //$("#SubdistributionsList").find(' > li:first').after('<li>' + nodeObject.code + '</li>');  
                tree.jstree(true).create_node(subdistributionsNode, CreateNode(subdistribution.id, subdistribution.code, "fa fa-cubes icon-state-success"));
                var subdistributionNode = tree.jstree(true).get_node(subdistribution.id);
                SetNodeRoute(subdistributionNode, "subdistribution", {dist_id: dist_id, subdist_id: subdistribution.id}, "Subdistribution: " + subdistribution.code);

                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.id + "Types", "Voucher Types", "fa fa-money icon-state-success"));
                var subdistributionTypesNode = tree.jstree(true).get_node(subdistribution.id + "Types");
                SetNodeRoute(subdistributionTypesNode, "vouchertypereport", {dist_id: dist_id, subdist_id: subdistribution.id}, "Voucher Types");

                tree.jstree(true).create_node(subdistributionTypesNode, CreateNode(subdistribution.id + "Types" + "AddNew", "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.id + "Types" + "AddNew"), "vouchertype", {dist_id: dist_id, subdist_id: subdistribution.id, vouchertype_id: ""}, "Add New Voucher Type");

                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.id + "Benes", "Beneficiaries", "fa fa-group icon-state-success"));
                var subdistributionBeneficiary = tree.jstree(true).get_node(subdistribution.id + "Benes");
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.id + "Benes"), "beneficiaryDist", {dist_id: dist_id, subdist_id: subdistribution.id}, "Beneficiaries");
                tree.jstree(true).disable_node(subdistributionBeneficiary);
               
               
                //*** Defining ToolTip ***
//                subdistributionBeneficiary.a_attr['class'] = 'tooltips';
//                subdistributionBeneficiary.a_attr['data-container'] = "body";
//                subdistributionBeneficiary.a_attr['data-placement'] = "right";
//                subdistributionBeneficiary.a_attr['data-html'] = "true";
//                subdistributionBeneficiary.a_attr['data-original-title'] = "YOU SHOULD ADD VOUCHER TYPE FIRST";
                //************************

                tree.jstree(true).open_node(subdistributionNode, false);
                tree.jstree(true).open_node(subdistributionTypesNode, false);

                if (WithSelectMethodology) {
                    tree.jstree(true).deselect_node(tree.jstree(true).get_selected(true)[0]);
                    tree.jstree(true).select_node(subdistribution.id);
                }
            },
            getAddTypeSubdistributionId: function () {
                var parentTypeNodeId = tree.jstree(true).get_selected(true)[0].parent;
                parentTypeNodeId = parentTypeNodeId.replace("Types", "");
                return parentTypeNodeId;
            },
            getBeneficiarySubdistributionId: function(){
                 var parentTypeNodeId = tree.jstree(true).get_selected(true)[0].parent;
                return parentTypeNodeId;
            },
            AddType: function (vouchType, WithSelectMethodology) {
                tree.jstree(true).create_node(vouchType.subdistribution_id + "Types", CreateNode(vouchType.id + "vouchertype", vouchType.value, "fa fa-dollar icon-state-success"));
                SetNodeRoute(tree.jstree(true).get_node(vouchType.id + "vouchertype"), "vouchertype", {dist_id: dist_id, subdist_id: subdistribution.id, vouchertype_id: vouchType.id}, "Voucher Type: " + vouchType.value);

                var subdistributionBeneficiary = tree.jstree(true).get_node(vouchType.subdistribution_id + "Benes");                
                //console.log(subdistributionBeneficiary);
                //$("#" + vouchType.subdistribution_id + "Benes > a" ).removeClass("tooltips");
                tree.jstree(true).enable_node(subdistributionBeneficiary);

                if (WithSelectMethodology) {
                    tree.jstree(true).deselect_node(tree.jstree(true).get_selected(true)[0]);
                    tree.jstree(true).select_node(vouchType.id + "vouchertype");
                }
                //subdistributionBeneficiary.li_attr['rel'] = "";
                //subdistributionBeneficiary.icon = "fa fa-group icon-state-success";
                //console.log( tree.jstree(true).get_node(vouchType.subdistribution_id));
                //tree.jstree(true).get_node(vouchType.subdistribution_id).state.opened = false;
            },
            AddVendor: function (vendor) {
                tree.jstree(true).create_node(vendorsNode, CreateNode(vendor.name + "vendor", vendor.name));
                var vendorNode = tree.jstree(true).get_node(vendor.name + "vendor");
                SetNodeRoute(vendorNode, "vendor", {dist_id: dist_id, vendor_id: vendor.id}, "Vendor: " + vendor.name);

                if (SharedPropertiesService.getDistributionStatus() == false) 
                {
                    tree.jstree(true).create_node(vendorNode, CreateNode(vendor.name + "Benes", "Beneficiaries", "fa fa-group"));
                SetNodeRoute(tree.jstree(true).get_node(vendor.name + "Benes"), "beneficiaryVendor", {dist_id: dist_id}, "Beneficiaries");
                }
                
                tree.jstree(true).deselect_node(tree.jstree(true).get_selected(true)[0]);
                ree.jstree(true).select_node(vendor.name + "vendor");
            },
            BulidTreeByDistribution: function (distribution, subdistribution, WithSelectMethodology) {
                this.__Clear();
                this.AddDistribution(distribution, WithSelectMethodology);
                var currentThis = this;

                DataProviderService.getSubdistributionsByFilter([["distribution_id", distribution.id, "="]]).success(function (data) {
                    var relatedSubdistributions = data["data"]["subdistribution"];

console.log(relatedSubdistributions);

                    var responses = [];
                    for (i = 0; i < relatedSubdistributions.length; i++) {
                        var withSelectMethodology = false;
                        if (subdistribution)
                            withSelectMethodology = subdistribution.id == relatedSubdistributions[i].id ? true : false;
                        var funcStruct = {
                            func: DataProviderService.getSubdistributionVoucherByFilter,
                            subdistribution: relatedSubdistributions[i],
                            WithSelectMethodology: withSelectMethodology
                        }
                        responses.push(funcStruct);
                    }

                    for (j = 0; j < responses.length; j++) {
                        currentThis.BulidTreeBySubdistributionWithFunc(responses[j]);
                    }
                });
            },
            BulidTreeBySubdistribution: function (subdistribution) {
                this.AddSubdistribution(subdistribution, false);
                var currentThis = this;

                DataProviderService.getSubdistributionVoucherByFilter([["subdistribution_id", subdistribution.id, "="]]).success(function (data) {
                    var relatedVoucherTypes = data["data"]["distributionVoucher"];
                    for (j = 0; j < relatedVoucherTypes.length; j++) {
                        currentThis.BulidTreeByVoucherType(relatedVoucherTypes[j]);
                    }
                });
            },
            BulidTreeBySubdistributionWithFunc: function (response) {
console.log(response);
                this.AddSubdistribution(response.subdistribution, response.WithSelectMethodology);
                var currentThis = this;

                response.func([["subdistribution_id", response.subdistribution.id, "="]]).success(function (data) {
                    var relatedVoucherTypes = data["data"]["distributionVoucher"];
                    for (j = 0; j < relatedVoucherTypes.length; j++) {
                        currentThis.BulidTreeByVoucherType(relatedVoucherTypes[j]);
                    }
                });
            },
            BulidTreeByVoucherType: function (voucherType) {
                this.AddType(voucherType, false);
            },
            LoadSubdistributions: function () {
                DataProviderService.getSubdistributions().success(function (data) {
                    var data = data["data"]["subdistribution"];
                    console.log(data);

                    for (i = 0; i < data["length"]; i++) {

                        tree.jstree(true).create_node(subdistributionsNode, CreateNode("Subdistribution" + data[i].id, data[i].code));
                        //SetNodeRoute(tree.jstree(true).get_node("Subdistribution" + subdistributions[i].id), "subdistribution/" + subdistributions[i].id);
                    }
                });
            }
        }

        var $root = $("#tree_1").jstree({
            core: {
                check_callback: true,
                multiple: false,
                draggable : false
            },            
            plugins: []
        });

        $("#tree_1").bind("select_node.jstree", function (event, data)
        {                
          
            if (data.node.a_attr['ui-sref-param']) 
                $state.go(data.node.a_attr['ui-sref'], data.node.a_attr['ui-sref-param']);            
            else
//                $state.transitionTo(data.node.a_attr['ui-sref']);               
    $state.go(data.node.a_attr['ui-sref']);               
          

             $scope.contentTitle = data.node.a_attr['ui-sref-tag'];
             if(data.node.parents){
                var breadCrumbData = [];
                for (i=data.node.parents.length - 1; i>= 0; i--) {
                    var parent = tree.jstree(true).get_node(data.node.parents[i]);              
                    if (parent.a_attr)
                        breadCrumbData.push(parent.a_attr['ui-sref-tag']);
                }
                breadCrumbData.push(data.node.a_attr['ui-sref-tag']);               
                if (breadCrumbData != "")
                   CreateBreadCrumbTree(breadCrumbData);
             }
        });

//        $("#tree_1").on('changed.jstree', function (e, data) {
//            if (data.instance.get_node(data.selected[0]).text == "Beneficiaries") {
//                var node = data.instance.get_node(data.selected[0]);
//                console.log(node);
//                
//                if (false ) {
//                    alert(1);
//                    toastr.error('You need to define one voucher type at least.');
//                }
//            }
//        });

        var $tree = $WizardTree;
        $tree.__Init($root);
        SharedPropertiesService.setTree($tree);    
        
        $scope.contentTitle = "Content";
    }]);
