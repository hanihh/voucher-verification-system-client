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
    //node.a_attr["ui-sref"] = url;

}

app.controller("ContentController", ['$scope', '$state', 'WizardViewsService', 'SharedPropertiesService', function ($scope, $state, WizardViewsService, SharedPropertiesService) {

        var $WizardTree = {
            $tree: {},
            distributionsId: "distributions",
            distributionsNode: "",
            subdistributionsId: "subdistributions",
            subdistributionsNode: "",
            addNewSubdistributionsId: "addNewSubdistributions",
            vendorsId: "vendors",
            vendorsNode: "",
            addNewVendorsId: "addNewVendors",
            __Init: function (_tree) {
                tree = _tree;
                tree.jstree(true).create_node(tree, CreateNode(this.distributionsId, "Distributions"));
                distributionsNode = tree.jstree(true).get_node(this.distributionsId);

                //SetNodeRoute(distributionsNode, "distributions");
            },
            AddDistributions: function () {
                tree.jstree(true).create_node(distributionsNode, CreateNode(this.subdistributionsId, "Subdistributions"));
                subdistributionsNode = tree.jstree(true).get_node(this.subdistributionsId);
                //SetNodeRoute(subdistributionsNode, "subdistributionsreport");

                tree.jstree(true).create_node(subdistributionsNode, CreateNode(this.addNewSubdistributionsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                //SetNodeRoute(tree.jstree(true).get_node(this.addNewSubdistributionsId), "subdistribution");

                //this.LoadSubdistributions();

                tree.jstree(true).create_node(distributionsNode, CreateNode(this.vendorsId, "Vendors"));
                vendorsNode = tree.jstree(true).get_node(this.vendorsId);
                //SetNodeRoute(vendorsNode, "vendorreport");

                tree.jstree(true).create_node(vendorsNode, CreateNode(this.addNewVendorsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                //SetNodeRoute(tree.jstree(true).get_node(this.addNewVendorsId), "vendor");
            },
            AddSubdistribution: function (nodeObject) {
                //$("#SubdistributionsList").find(' > li:first').after('<li>' + nodeObject.code + '</li>');  
                tree.jstree(true).create_node(subdistributionsNode, CreateNode(nodeObject.name, nodeObject.name));
                var subdistributionNode = tree.jstree(true).get_node(nodeObject.name);
                //SetNodeRoute(subdistributionNode, "subdistribution/" + nodeObject.id);

                tree.jstree(true).create_node(subdistributionNode, CreateNode(nodeObject.name + "Types", "Types"));
                var subdistributionTypesNode = tree.jstree(true).get_node(nodeObject.name + "Types");
                //SetNodeRoute(subdistributionTypesNode, "");

                tree.jstree(true).create_node(subdistributionTypesNode, CreateNode(nodeObject.name + "Types" + "AddNew", "Add New", "fa fa-plus-circle icon-state-danger"));
                //SetNodeRoute(tree.jstree(true).get_node(nodeObject.name + "Types" + "AddNew"), "");

                //tree.jstree(true).select_node(nodeObject.name + "Types" + "AddNew");

                tree.jstree(true).create_node(subdistributionNode, CreateNode(nodeObject.name + "Benes", "Beneficiaries"));
                SetNodeRoute(tree.jstree(true).get_node(nodeObject.name + "Benes"), "");
            },
            AddType: function (nodeObject) {
                /*
                 var parentTypeNode = tree.jstree(true).get_selected(true)[0].parent;        
                 tree.jstree(true).create_node(parentTypeNode, CreateNode(nodeObject.name + "Type", nodeObject.name));
                 SetNodeRoute(tree.jstree(true).get_node(nodeObject.name + "Type"), "");
                 */
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
            alert(data.node.id);
            $state.go(data.node.id);
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