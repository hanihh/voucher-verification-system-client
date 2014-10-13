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

function SetNodeRoute(node, url) {
    //node.a_attr["href"] = "#/" + url;
    node.a_attr["ui-sref"] = url;   
}

app.controller("ContentController", ['$scope', '$state', 'WizardViewsService', 'SharedPropertiesService', function ($scope, $state, WizardViewsService, SharedPropertiesService) {

        var $WizardTree = {
            $tree: {},
            //Should be on lower case to match the routing states
            distributionsId: "distributions",
            distributionsNode: "",
            subdistributionsId: "subdistributions",
            subdistributionsNode: "",
            addNewSubdistributionsId: "subdistribution",
            vendorsId: "vendors",
            vendorsNode: "",
            addNewVendorsId: "vendor",
            __Init: function (_tree) {
                tree = _tree;
                tree.jstree(true).create_node(tree, CreateNode(this.distributionsId, "Distributions", "fa fa-cube"));
                distributionsNode = tree.jstree(true).get_node(this.distributionsId);
                console.log(distributionsNode);
/*
                distributionsNode.data['class'] = 'tooltips';
                distributionsNode.data['data-container'] = "body";
                distributionsNode.data['data-placement'] = "right";
                distributionsNode.data['data-html'] = "true";
                distributionsNode.data['data-original-title'] = "YOU SHOULD ADD VOUCHER TYPE FIRST";
*/
                SetNodeRoute(distributionsNode, "distributions");
            },
            AddDistributions: function () {
                tree.jstree(true).create_node(distributionsNode, CreateNode(this.subdistributionsId, "Subdistributions", "fa fa-cubes icon-state-warning" ));
                subdistributionsNode = tree.jstree(true).get_node(this.subdistributionsId);
                SetNodeRoute(subdistributionsNode, "subdistributionsreport");

                tree.jstree(true).create_node(subdistributionsNode, CreateNode(this.addNewSubdistributionsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(this.addNewSubdistributionsId), "subdistribution");

                //this.LoadSubdistributions();

                tree.jstree(true).create_node(distributionsNode, CreateNode(this.vendorsId, "Vendors", "fa fa-building icon-state-warning"));
                vendorsNode = tree.jstree(true).get_node(this.vendorsId);
                SetNodeRoute(vendorsNode, "vendorreport");

                tree.jstree(true).create_node(vendorsNode, CreateNode(this.addNewVendorsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(this.addNewVendorsId), "vendor");
                
                tree.jstree(true).open_node(distributionsNode, false);       
                tree.jstree(true).open_node(subdistributionsNode, false);       
                tree.jstree(true).open_node(vendorsNode, false);       
            },
            AddSubdistribution: function (subdistribution) {
                //$("#SubdistributionsList").find(' > li:first').after('<li>' + nodeObject.code + '</li>');  
                tree.jstree(true).create_node(subdistributionsNode, CreateNode(subdistribution.id, subdistribution.code, "fa fa-cubes icon-state-success"));
                var subdistributionNode = tree.jstree(true).get_node(subdistribution.id);
                SetNodeRoute(subdistributionNode, "subdistribution/" + subdistribution.id);
   
                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.id + "Types", "Voucher Types", "fa fa-money icon-state-success"));
                var subdistributionTypesNode = tree.jstree(true).get_node(subdistribution.id + "Types");
                SetNodeRoute(subdistributionTypesNode, "typereport");

                tree.jstree(true).create_node(subdistributionTypesNode, CreateNode(subdistribution.id + "Types" + "AddNew", "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.id + "Types" + "AddNew"), "vouchertype");

                //tree.jstree(true).select_node(nodeObject.name + "Types" + "AddNew");

                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.id + "Benes", "Beneficiaries", "fa fa-group icon-state-success"));
                var subdistributionBeneficiary = tree.jstree(true).get_node(subdistribution.id + "Benes");
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.id + "Benes"), "beneficiaryDist");
                subdistributionBeneficiary.state.disabled = true;
                subdistributionBeneficiary.a_attr['class'] = 'tooltips';
                subdistributionBeneficiary.a_attr['data-container'] = "body";
                subdistributionBeneficiary.a_attr['data-placement'] = "right";
                subdistributionBeneficiary.a_attr['data-html'] = "true";
                subdistributionBeneficiary.a_attr['data-original-title'] = "YOU SHOULD ADD VOUCHER TYPE FIRST";
                
                tree.jstree(true).open_node(subdistributionNode, false); 
                tree.jstree(true).open_node(subdistributionTypesNode, false); 

            },
            getAddTypeSubdistributionId: function (){
                 var parentTypeNodeId = tree.jstree(true).get_selected(true)[0].parent;
                 parentTypeNodeId = parentTypeNodeId.replace("Types", "");                 
                 return parentTypeNodeId;
            },
            AddType: function (vouchType) {
                tree.jstree(true).create_node(vouchType.subdistribution_id + "Types", CreateNode(vouchType.id + "vouchertype", vouchType.type.name));
                SetNodeRoute(tree.jstree(true).get_node(vouchType.id + "vouchertype"), "vouchertype/" + vouchType.id);
                
                       var subdistributionBeneficiary = tree.jstree(true).get_node(vouchType.subdistribution_id + "Benes");
       
                subdistributionBeneficiary.state.disabled = false;
                subdistributionBeneficiary.a_attr['class'] = '';
          
                //subdistributionBeneficiary.li_attr['rel'] = "";
                //subdistributionBeneficiary.icon = "fa fa-group icon-state-success";
                //console.log( tree.jstree(true).get_node(vouchType.subdistribution_id));
                //tree.jstree(true).get_node(vouchType.subdistribution_id).state.opened = false;
            },
            AddVendor: function (vendor) {
                tree.jstree(true).create_node(vendorsNode, CreateNode(vendor.name, vendor.name));
                var vendorNode = tree.jstree(true).get_node(vendor.name);
                SetNodeRoute(vendorNode, "vendor/" + vendor.id);

                tree.jstree(true).create_node(vendorNode, CreateNode(vendor.name + "Benes", "Beneficiaries", "fa fa-group"));
                //SetNodeRoute(tree.jstree(true).get_node(nodeObject.name + "Benes"), "");
            },
            LoadSubdistributions: function () {
                WizardViewsService.getSubdistributions().success(function (data) {
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
                multiple: false
            },
            plugins: ["dnd"]
        });

 $("#tree_1").bind("select_node.jstree", function (event, data)
        {     
            //console.log(data.node);
            $state.go(data.node.a_attr['ui-sref']);
        });
        
        var $tree = $WizardTree;
        $tree.__Init($root);
        SharedPropertiesService.setTree($tree);
    }]);