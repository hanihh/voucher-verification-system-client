/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ui.router']);
var _BaseOutterHtmlPath = "views/wizardviews/";

function CreateNode(id, text, icon) {
    return {
        id: id,
        text: text, 
        icon: icon
    };
}

function SetNodeRoute(node, url) {
    node.a_attr["href"] = "#" + url;    
    //node.a_attr["ui-sref"] = url;
    
}

var WizardTree = {
    tree: {},
    distributionsId: "Distributions",
    distributionsNode: "",
    subdistributionsId: "Subdistributions",
    subdistributionsNode: "",
    addNewSubdistributionsId: "AddNewSubdistributions",
    vendorsId: "Vendors",
    vendorsNode: "",
    addNewVendorsId: "AddNewVendors",

    __Init: function (_tree) {
        tree = _tree;
        tree.jstree(true).create_node(tree, CreateNode("Distributions", "Distributions"));
        distributionsNode = tree.jstree(true).get_node(this.distributionsId);
        SetNodeRoute(distributionsNode, "distributions");
    },
    AddDistributions: function () {
        tree.jstree(true).create_node(distributionsNode, CreateNode(this.subdistributionsId, "Subdistributions"));
        subdistributionsNode = tree.jstree(true).get_node(this.subdistributionsId);
        SetNodeRoute(subdistributionsNode, "subdistributionsreport");
  
        tree.jstree(true).create_node(subdistributionsNode, CreateNode(this.addNewSubdistributionsId, "Add New", "fa fa-plus-circle icon-state-danger"));
        SetNodeRoute(tree.jstree(true).get_node(this.addNewSubdistributionsId), "subdistribution");
       
        tree.jstree(true).create_node(distributionsNode, CreateNode(this.vendorsId, "Vendors"));
        vendorsNode = tree.jstree(true).get_node(this.vendorsId);
        SetNodeRoute(vendorsNode, "vendorreport");
       
        tree.jstree(true).create_node(vendorsNode, CreateNode(this.addNewVendorsId, "Add New", "fa fa-plus-circle icon-state-danger"));   
        SetNodeRoute(tree.jstree(true).get_node(this.addNewVendorsId), "vendor");
    },
    AddSubdistribution: function (nodeObject) {
        //$("#SubdistributionsList").find(' > li:first').after('<li>' + nodeObject.code + '</li>');  
        tree.jstree(true).create_node(subdistributionsNode, CreateNode(nodeObject.name, nodeObject.name));
        var subdistributionNode = tree.jstree(true).get_node(nodeObject.name);
        SetNodeRoute(subdistributionNode, "subdistribution?"+ nodeObject.id);
        
        tree.jstree(true).create_node(subdistributionNode, CreateNode(nodeObject.name + "Types", "Types"));
        var subdistributionTypesNode = tree.jstree(true).get_node(nodeObject.name + "Types");
        SetNodeRoute(subdistributionTypesNode, "");
 
        tree.jstree(true).create_node(subdistributionTypesNode, CreateNode(nodeObject.name + "Types" + "AddNew", "Add New", "fa fa-plus-circle icon-state-danger"));
        SetNodeRoute(tree.jstree(true).get_node(nodeObject.name + "Types" + "AddNew"), "");        
        
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
        SetNodeRoute(vendorNode, "");
        
        tree.jstree(true).create_node(vendorNode, CreateNode(nodeObject.name + "Benes", "Beneficiaries"));
        SetNodeRoute(tree.jstree(true).get_node(nodeObject.name + "Benes"),"");
    }

}

function GetHTML(htmlPage) {
    var fullPath = _BaseOutterHtmlPath + htmlPage;
    $.get(fullPath, function (data) {
        return data + "";
    });
}

function replaceElement(el) {
    var parent = el.parentNode;
    console.log(parent);
    parent.removeChild(el);
    parent.appendChild(el);
}

$(document).ready(function () {
/*
    var $root = $("#tree_1").jstree({
        core: {
            check_callback: true,
            multiple : false
        },
        plugins: ["dnd"]
    });

    var tree = WizardTree;
    tree.__Init($root);
    tree.AddDistributions();
    tree.AddSubdistribution({name: "Distribution1"});
      tree.AddVendor({name: "Vendor1"});
      tree.AddType({name: "Type1"});
      
      
      
        setTimeout( function(){ 
    angular.bootstrap(document, ['app']);
    alert("Done");
  }
 , 5000 );
    */
    
    //$("#Subdistributions").attr("data-jstree", '{ "disabled" : true }');
    //$("#tree_1").jstree("refresh");
    $("#tree_1").bind("select_node.jstree", function (event, data)
    {

        var breadcrumb = [];
        var id = data.event.currentTarget.id;
        //console.log(id);
        //console.log( $("#" + id).parents().find(".SystemNode"));
        //!!!! Getting sibiling other than parents !!!!!
        $("#" + id).parents().each(function ()
        {
            //console.log($(this));
            if ($(this).hasClass("SystemNode"))
                breadcrumb.push($(this).attr('id'));
        });
        //breadcrumb = breadcrumb.join(" > ");

        $("ul#breadcrumb").empty();
        //console.log($("ul#breadcrumb").html());
        //console.log(breadcrumb);
        CreateBreadCrumbTree(breadcrumb);
        //$("#breadcrumb").text(breadcrumb);
    });


    function CreateBreadCrumbTree(data) {
        if (data)
            for (i = 0; i < data.length; i++) {
                if (data[i] == "Distributions") {
                    //$("#breadcrumb").append('<li><i class="fa fa-home"></i><a href="#/home">Home</a><i class="fa fa-angle-right"></i></li>');
                    $("ul#breadcrumb").append('<li><i class="fa fa-home"></i><a id="page-breadcrumb-home"> Distributions</a> <i class="fa fa-angle-right"></i></li>');

                }
                else
                {
                    var dir = data[i];
                    //$("#breadcrumb").append('<li><a href="#/' + dir + '">' + dir + '</a> <i class="fa fa-angle-right"></i>');
                    $("ul#breadcrumb").append('<li><a>' + dir + '</a> <i class="fa fa-angle-right"></i>');

                }
            }
        else
            // $("#breadcrumb").append('<li><i class="fa fa-home"></i><a href="#/home">Home</a><i class="fa fa-angle-right"></i></li>');
            $("ul#breadcrumb").append('<li><i class="fa fa-home"></i><a id="page-breadcrumb-home"> Distributions</a> <i class="fa fa-angle-right"></i></li>');
    }


    /*
     CreateBreadCrumbTree();
     $('a.SystemNode').live('click', function () {
     var breadcrumbData = [];
     $("ul#breadcrumb").empty();
     if ($("#breadcrumb-current").val()) {
     console.log($("#breadcrumb-current").val());
     breadcrumbData = $("#breadcrumb-current").val().split('-');
     CreateBreadCrumbTree(breadcrumbData);
     }
     
     
     
     switch ($(this).attr("SystemNodeType")) {
     case "Distribution":
     //   $("#breadcrumb").append('<a href="#"> Distributions </a> <i class="fa fa-angle-right"></i>')
     
     // $("#breadcrumb").append('<li><i class="fa fa-home"></i><a id="page-breadcrumb-home" href="#/home">Home</a><i class="fa fa-angle-right"></i></li>');
     // $scope.contentHtmlPage = _BaseOutterHtmlPath + "Distributions.html";
     //   $(".scroller").append('<div ng-include="\'' + $scope.contentHtmlPage + '\'"></div>');
     //ng-include="'views/wizardviews/Distributions.html'"
     break;
     case "NewSubdistribution":
     //$(this).closest( "ul" ).find(' > li:nth-last-child(1)').after(_SystemNotesTemplates.newsubdistribution);
     break;
     }
     
     }); */
});
//  $("#content").append("<div>" + GetHTML("Distributions.html") + "</div>");

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}


function CheckTreeProgress() {
    if (treeProgress.distributionsChecked) {
        //$("#Subdistributions").parent("li").
    }
}


function ParseFilter(filterObj) {
    var filterString = "?filter=[";
    $.each(filter, function (key, value) {
        filterString += '{"property": "' + key + '" , "value" : "' + value.value + '" , "operator" : "' + value.operator;
    });
    filterString += "]";
}