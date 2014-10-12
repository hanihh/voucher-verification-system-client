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
                tree.jstree(true).create_node(tree, CreateNode(this.distributionsId, "Distributions"));
                distributionsNode = tree.jstree(true).get_node(this.distributionsId);

                SetNodeRoute(distributionsNode, "distributions");
            },
            AddDistributions: function () {
                tree.jstree(true).create_node(distributionsNode, CreateNode(this.subdistributionsId, "Subdistributions"));
                subdistributionsNode = tree.jstree(true).get_node(this.subdistributionsId);
                SetNodeRoute(subdistributionsNode, "subdistributionsreport");

                tree.jstree(true).create_node(subdistributionsNode, CreateNode(this.addNewSubdistributionsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(this.addNewSubdistributionsId), "subdistribution");

                //this.LoadSubdistributions();

                tree.jstree(true).create_node(distributionsNode, CreateNode(this.vendorsId, "Vendors"));
                vendorsNode = tree.jstree(true).get_node(this.vendorsId);
                SetNodeRoute(vendorsNode, "vendorreport");

                tree.jstree(true).create_node(vendorsNode, CreateNode(this.addNewVendorsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(this.addNewVendorsId), "vendor");
            },
            AddSubdistribution: function (subdistribution) {
                //$("#SubdistributionsList").find(' > li:first').after('<li>' + nodeObject.code + '</li>');  
                tree.jstree(true).create_node(subdistributionsNode, CreateNode(subdistribution.code, subdistribution.code));
                var subdistributionNode = tree.jstree(true).get_node(subdistribution.code);
                SetNodeRoute(subdistributionNode, "subdistribution/" + subdistribution.id);

                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.code + "Types", "Types"));
                var subdistributionTypesNode = tree.jstree(true).get_node(subdistribution.code + "Types");
                SetNodeRoute(subdistributionTypesNode, "typereport");

                tree.jstree(true).create_node(subdistributionTypesNode, CreateNode(subdistribution.code + "Types" + "AddNew", "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.code + "Types" + "AddNew"), "vouchertype");

                //tree.jstree(true).select_node(nodeObject.name + "Types" + "AddNew");

                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.code + "Benes", "Beneficiaries"));
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.code + "Benes"), "BeneficiaryDist");
            },
            AddType: function (vouchType) {
                
                 var parentTypeNode = tree.jstree(true).get_selected(true)[0].parent; 
                 console.log(parentTypeNode);
                 console.log(vouchType);
                 tree.jstree(true).create_node(parentTypeNode, CreateNode(vouchType.type.name, vouchType.type.name));
                 SetNodeRoute(tree.jstree(true).get_node(vouchType.type.name), "vouchertype/" + vouchType.id);
                 
                //var subdistributionNode = tree.jstree(true).get_node(nodeObject.name);

            },
            AddVendor: function (nodeObject) {
                tree.jstree(true).create_node(vendorsNode, CreateNode(nodeObject.name, nodeObject.name));
                var vendorNode = tree.jstree(true).get_node(nodeObject.name);
                //SetNodeRoute(vendorNode, "");

                tree.jstree(true).create_node(vendorNode, CreateNode(nodeObject.name + "Benes", "Beneficiaries"));
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


        $("#tree_1").bind("select_node.jstree", function (event, data)
        {       
            console.log(data.node);
            $state.go(data.node.a_attr['ui-sref']);
        });

        var $root = $("#tree_1").jstree({
            core: {
                check_callback: true,
                multiple: false
            },
            plugins: ["dnd"]
        });

        var $tree = $WizardTree;
        $tree.__Init($root);        
        SharedPropertiesService.setTree($tree);          
    }]);