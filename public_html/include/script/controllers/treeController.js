/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var IdPrefixString = {
    distribution: "maindist",
    subdistribution: "subdist",
    subdistributionsreport: "subdistreport",
    vouchertypesreport: "vouchertypereport",
    vendor: "vendor",
    vendorsreport: "vendorreport",
    voucherType: "voucherType",
    beneficiariesSubdistribution: "benesSubdist",
    beneficiariesVendor: "benesVendor"
}

function CreateNode(id, text, icon) {
    return {
        id: id,
        text: text,
        icon: icon
    };
}

//url parameter should be on lower case to match the routing states
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
            treeDivId: "",
            dist_id: null,
            distributionIdString: "",
            //distributionsNode: "",
            //subdistributionsNode: "",
            //vendorsNode: "",
            addNewSubdistributionsId: "addnew" + IdPrefixString.subdistribution,
            addNewVendorsId: "addnew" + IdPrefixString.vendor,
            addNewVoucherType: "addnew" + IdPrefixString.voucherType,
            
            __Init: function (_tree, treeDivId) {
                tree = _tree;
                treeDivId = treeDivId;
                tree.jstree(true).create_node(tree, CreateNode("AddNewDistribution", "Add Distribution", "fa fa-plus-circle icon-state-danger"));
                var distributionsNode = tree.jstree(true).get_node("AddNewDistribution")
                SetNodeRoute(distributionsNode, "distributions", {dist_id: ""}, "Add New Distribution");
            },
            __Clear: function () {
//                var distributionsNode = tree.jstree(true).get_node("AddNewDistribution");
//                tree.jstree(true).delete_node(distributionsNode);
                 tree.jstree(true).delete_node(this.treeDivId + ' > ul > li');
            },
            AddDistribution: function (distribution, WithSelectMethodology) {
                dist_id = distribution.id;
                this.__Clear();
                this.distributionIdString = distribution.id + IdPrefixString.distribution;
                tree.jstree(true).create_node(tree, CreateNode(this.distributionIdString, distribution.name, "fa fa-cube"));
                var distributionsNode = tree.jstree(true).get_node(this.distributionIdString);
                SetNodeRoute(distributionsNode, "distributions", {dist_id: distribution.id}, "Distribution: " + distribution.name);
                
                this.AddDistributionChilds(distribution);
                
                tree.jstree(true).open_node(distributionsNode, false);
                
                if (WithSelectMethodology) {
                    tree.jstree(true).deselect_node(tree.jstree(true).get_selected(true)[0]);
                    tree.jstree(true).select_node(this.distributionIdString);
                }
//                tree.jstree(true).select_node(nodeObject.name + "Types" + "AddNew");
            },
            AddDistributionArray: function (distributions) {
                this.__Clear();
                for (i = 0; i < distributions.length; i++) {             
                    var distributionIdString = distributions[i].id + IdPrefixString.distribution;
                    tree.jstree(true).create_node(tree, CreateNode(distributionIdString, distributions[i].name, "fa fa-cube"));
                    var distributionNode = tree.jstree(true).get_node(distributionIdString);
                    SetNodeRoute(distributionNode, "distributions", {dist_id: distributions[i].id}, "Distribution: " + distributions[i].name);
                    
      
                    this.AddDistributionChilds(distributions[i]);
                } 
                
                var currentthis = this;
                 $("#tree_1").bind("open_node.jstree", function (e, data) {
                    if (data.node.id.indexOf(IdPrefixString.distribution) > -1)
                    {
                        var distId = data.node.id.substr(0, data.node.id.indexOf(IdPrefixString.distribution));
                        currentthis.BulidTreeByAddedDistribution(distId);                    
                    }
                    console.log(data.node.id);
                });
            },
            AddDistributionChilds: function(distribution) {                  
                var distributionIdString = distribution.id + IdPrefixString.distribution;
                var distributionNode = tree.jstree(true).get_node(distributionIdString);
                
                tree.jstree(true).create_node(distributionNode, CreateNode(distributionIdString + IdPrefixString.subdistributionsreport, "Subdistributions", "fa fa-cubes icon-state-warning"));
                var subdistributionsNode = tree.jstree(true).get_node(distributionIdString + IdPrefixString.subdistributionsreport);               
                SetNodeRoute(subdistributionsNode, "subdistributionsreport", {dist_id: distribution.id}, "Subdistributions");
                
                tree.jstree(true).create_node(subdistributionsNode, CreateNode(distributionIdString + this.addNewSubdistributionsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(distributionIdString + this.addNewSubdistributionsId), "subdistribution", {dist_id: distribution.id, subdist_id: ""}, "Add New Subdistribution");
                //this.LoadSubdistributions();

                tree.jstree(true).create_node(distributionNode, CreateNode(distributionIdString + IdPrefixString.vendorsreport, "Vendors", "fa fa-building icon-state-warning"));
                vendorsNode = tree.jstree(true).get_node(distributionIdString + IdPrefixString.vendorsreport);
                SetNodeRoute(vendorsNode, "vendorreport", {dist_id: distribution.id}, "Vendors");
                
                tree.jstree(true).create_node(vendorsNode, CreateNode(distributionIdString + this.addNewVendorsId, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(distributionIdString + this.addNewVendorsId), "vendor", {dist_id: distribution.id, vendormobile_id: ""}, "Add New Vendor");
                
                tree.jstree(true).open_node(subdistributionsNode, false);
                tree.jstree(true).open_node(vendorsNode, false);
                
            },
            AddSubdistribution: function (subdistribution, WithSelectMethodology) {
                var subdistributionsNode = this.GetSubdistributionsNode(subdistribution.distribution_id);
                tree.jstree(true).create_node(subdistributionsNode, CreateNode(subdistribution.id + IdPrefixString.subdistribution, subdistribution.code, "fa fa-cubes icon-state-success"));
                var subdistributionNode = tree.jstree(true).get_node(subdistribution.id + IdPrefixString.subdistribution);
                SetNodeRoute(subdistributionNode, "subdistribution", {dist_id: subdistribution.distribution_id, subdist_id: subdistribution.id}, "Subdistribution: " + subdistribution.code);
                
                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.id + IdPrefixString.subdistribution +  IdPrefixString.vouchertypesreport, "Voucher Types", "fa fa-money icon-state-success"));
                var subdistributionTypesNode = tree.jstree(true).get_node(subdistribution.id + IdPrefixString.subdistribution +  IdPrefixString.vouchertypesreport);
                SetNodeRoute(subdistributionTypesNode, "vouchertypereport", {dist_id: subdistribution.distribution_id, subdist_id: subdistribution.id}, "Voucher Types");
                
                tree.jstree(true).create_node(subdistributionTypesNode, CreateNode(subdistribution.id + IdPrefixString.subdistribution + this.addNewVoucherType, "Add New", "fa fa-plus-circle icon-state-danger"));
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.id + IdPrefixString.subdistribution + this.addNewVoucherType), "vouchertype", {dist_id: subdistribution.distribution_id, subdist_id: subdistribution.id, vouchertype_id: ""}, "Add New Voucher Type");
                
                tree.jstree(true).create_node(subdistributionNode, CreateNode(subdistribution.id + IdPrefixString.subdistribution + IdPrefixString.beneficiariesSubdistribution, "Beneficiaries", "fa fa-group icon-state-success"));
                var subdistributionBeneficiary = tree.jstree(true).get_node(subdistribution.id + IdPrefixString.subdistribution + IdPrefixString.beneficiariesSubdistribution);
                SetNodeRoute(tree.jstree(true).get_node(subdistribution.id + IdPrefixString.subdistribution + IdPrefixString.beneficiariesSubdistribution), "beneficiaryDist", {dist_id: subdistribution.distribution_id, subdist_id: subdistribution.id}, "Beneficiaries");
                
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
            getBeneficiarySubdistributionId: function () {
                var parentTypeNodeId = tree.jstree(true).get_selected(true)[0].parent;
                return parentTypeNodeId;
            },
            AddType: function (vouchType, WithSelectMethodology) {                                 
                var voucherTypesNode = this.GetVoucherTypesNode(vouchType.subdistribution_id);
                var dist_id =  this.GetDistributionId(voucherTypesNode);
                
                tree.jstree(true).create_node(voucherTypesNode, CreateNode(vouchType.subdistribution_id + IdPrefixString.subdistribution + vouchType.id + IdPrefixString.voucherType, vouchType.value, "fa fa-dollar icon-state-success"));               
                SetNodeRoute(tree.jstree(true).get_node(vouchType.subdistribution_id + IdPrefixString.subdistribution + vouchType.id + IdPrefixString.voucherType), "vouchertype", {dist_id: dist_id, subdist_id: vouchType.subdistribution_id, vouchertype_id: vouchType.id}, "Voucher Type: " + vouchType.value);
                
                var subdistributionBeneficiary = tree.jstree(true).get_node(vouchType.subdistribution_id + IdPrefixString.subdistribution + IdPrefixString.beneficiariesSubdistribution);
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
            AddVendor: function (vendormobile, WithSelectMethodology) {             
                var vendorsNode = this.GetVendorsNode(vendormobile.distribution_id);

                tree.jstree(true).create_node(vendorsNode, CreateNode(vendormobile.id + IdPrefixString.vendor, vendormobile.vendor.en_name, "fa fa-home"));
                var vendorNode = tree.jstree(true).get_node(vendormobile.id + IdPrefixString.vendor);
                SetNodeRoute(vendorNode, "vendor", {dist_id: vendormobile.distribution_id, vendormobile_id: vendormobile.id}, "Vendor: " + vendormobile.vendor.en_name);
                if (SharedPropertiesService.getDistributionStatus() == false)
                {                    
                    tree.jstree(true).create_node(vendorNode, CreateNode(vendormobile.id + IdPrefixString.vendor + IdPrefixString.beneficiariesVendor, "Beneficiaries", "fa fa-group"));
                    SetNodeRoute(tree.jstree(true).get_node(vendormobile.id +IdPrefixString.vendor+ IdPrefixString.beneficiariesVendor), "beneficiaryVendor", {dist_id: vendormobile.distribution_id, vendormobile_id: vendormobile.id}, "Beneficiaries");
                }   

                if (WithSelectMethodology) {
                    tree.jstree(true).deselect_node(tree.jstree(true).get_selected(true)[0]);
                    tree.jstree(true).select_node(vendormobile.id + IdPrefixString.vendor + IdPrefixString.beneficiariesVendor);
                }
            },
            SelectTreeNodeByWizardModel: function (object) {
                if (object.subdistribution)
                    console.log(object.subdistribution);
                if (object.vendor)
                    alert("vendor");
                if (object.voucherType)
                    alert("voucherType");
                if (object.beneficiaryDist)
                    alert("beneficiaryDist");
                if (object.beneficiaryVendor)
                    alert("beneficiaryVendor");

            },
            BulidAllTreeByDistribution: function (distribution, WithSelectMethodology) {
                this.__Clear();
                this.AddDistribution(distribution, WithSelectMethodology);                               
                this.BulidTreeByAddedDistribution(distribution.id);
            },  
            BulidTreeByAddedDistribution: function (distributionId) {
                 var currentThis = this;
                 
                DataProviderService.getSubdistributionsByFilter([["distribution_id", distributionId, "="]]).success(function (data) {                    
                    var relatedSubdistributions = data["data"]["subdistribution"];           
                    var responses = [];
                    for (i = 0; i < relatedSubdistributions.length; i++) {
//                        var withSelectMethodology = false;
//                        if (subdistribution)
//                            withSelectMethodology = subdistribution.id == relatedSubdistributions[i].id ? true : false;
                        var funcStruct = {
                            func: DataProviderService.getSubdistributionVoucherByFilter,
                            subdistribution: relatedSubdistributions[i],
                            //WithSelectMethodology: withSelectMethodology
                            WithSelectMethodology: false
                        }
                        responses.push(funcStruct);
                    }

                    for (j = 0; j < responses.length; j++) {
                        currentThis.BulidTreeBySubdistributionWithFunc(responses[j]);
                    }
                });
                DataProviderService.getVendorMobilesByFilter([["distribution_id", distributionId, "="]]).success(function (data) {
                    var relatedVendors = data["data"]["vendorMobile"];
                    for (i = 0; i < relatedVendors.length; i++) {
                        currentThis.AddVendor(relatedVendors[i]);
                    }
                });
            },
            BulidTreeBySubdistribution: function (subdistribution) {
                this.AddSubdistribution(subdistribution, false);
                var currentThis = this;
                DataProviderService.getSubdistributionVoucherByFilter(getSubdistributionVoucherByFilter).success(function (data) {
                    var relatedVoucherTypes = data["data"]["distributionVoucher"];
                    for (j = 0; j < relatedVoucherTypes.length; j++) {
                        currentThis.BulidTreeByVoucherType(relatedVoucherTypes[j]);
                    }
                });
            },
            BulidTreeBySubdistributionWithFunc: function (response) {
                //  console.log(response);
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
            BuildTreeWithDistributionIdByQueryString: function (dist_id) {
                var currentThis = this;
                $.getScript('include/ViewModels/Core/Distribution.js', function () {
                    SharedPropertiesService.setDistributionId(dist_id);
                    SharedPropertiesService.setTreeBuildStatus(true);
                    DataProviderService.getDistributions(dist_id).success(function (data) {
                        var data = data["data"]["distribution"];
                        var distribution = new Distribution();
                        var currentDistribution = distribution.parse(data);
                        currentThis.BulidAllTreeByDistribution(currentDistribution);
                    });
                });
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
            },
            GetSubdistributionsNode: function(distributionId){
                var distributionIdString = distributionId + IdPrefixString.distribution; 
                return tree.jstree(true).get_node(distributionIdString + IdPrefixString.subdistributionsreport);
            },
             GetVendorsNode : function(distributionId){
                var distributionIdString = distributionId + IdPrefixString.distribution; 
                return tree.jstree(true).get_node(distributionIdString + IdPrefixString.vendorsreport);
            },
            GetVoucherTypesNode: function(subdistributionId) {
               return tree.jstree(true).get_node(subdistributionId + IdPrefixString.subdistribution + IdPrefixString.vouchertypesreport);                
            },
            GetDistributionId: function(node){
                var distIdString = node.parents[node.parents.length - 2];
                return distIdString.substr(0, distIdString.indexOf(IdPrefixString.distribution));
            }           
        }

        var $root = $("#tree_1").jstree({
            core: {
                check_callback: true,
                multiple: false,
                draggable: false
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
            if (data.node.parents) {
                var breadCrumbData = [];
                for (i = data.node.parents.length - 1; i >= 0; i--) {
                    var parent = tree.jstree(true).get_node(data.node.parents[i]);
                    if (parent.a_attr)
                        breadCrumbData.push(parent.a_attr['ui-sref-tag']);
                }
                breadCrumbData.push(data.node.a_attr['ui-sref-tag']);
                if (breadCrumbData != "")
                    CreateBreadCrumbTree(breadCrumbData);
            }
        });
       
        var $tree = $WizardTree;
        $tree.__Init($root, "#tree_1");
        SharedPropertiesService.setTree($tree);
        $scope.contentTitle = "Content";
    }]);
