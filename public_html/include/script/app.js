/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 var app = angular.module('app', ['ngRoute']);
 app
 .config(['$routeProvider',
 function($routeProvider) {
 $routeProvider
 .when('/distributions/', {
 templateUrl: 'views/wizardviews/distributions.html',
 controller: 'DistributionsController'
 });
 }])
 */
 
var app = angular.module('app', ['ui.router']);
var _BaseOutterHtmlPath = "views/wizardviews/";

var _SystemNotesTemplates = {
        distributions: '<li>Subdistribution</li>',
        subdistributions:'<li data-jstree=\'{ "opened" : false  }\' >\
                                                    <a   class="SystemNode"  SystemNodeType="Subdistributions" id="Subdistributions" >Subdistributions</a>\
                                                    <ul  id="SubdistributionsList">\
                                                        <li data-jstree=\'{"icon" : "fa fa-plus-circle icon-state-danger"}\' >\
                                                            <a ui-sref="newsubdistribution" href="#" id="newsubdistribution">Add New</a>\
                                                        </li>\
                                                    </ul>\
                                                </li>',
        vendors: '<li data-jstree=\'{ "opened" : false }\'>\
                                                    <a   class="SystemNode"  SystemNodeType="Vendors" id="vendors" >Vendors</a>\
                                                    <ul>\
                                                        <li data-jstree=\'{"icon" : "fa fa-plus-circle icon-state-danger"}\'>\
                                                            <a  ui-sref="newvouchertype" class="SystemNode" SystemNodeType="NewVendor"  id="NewVendor" href="#">Add New</a>\
                                                        </li>\
                                                    </ul>\
                                                </li>'  

    }             

var SystemNode = {
        init: function(){
            return {
                template: "",
                parent: ""
            }
        }
    }

var WizardTree = {    
    
    TreeStructure: "",
    
    Init: function(){
        
    },
    
    Distributions: SystemNode.init(_SystemNotesTemplates.distributions),
    
    Subdistributions: SystemNode.init(_SystemNotesTemplates.distributions),
    Newdistribution: SystemNode.init(_SystemNotesTemplates.distributions),
    VoucherTypes: SystemNode.init(_SystemNotesTemplates.distributions),
    Newvouchertype: SystemNode.init(_SystemNotesTemplates.distributions),
    beneficiariesDistribution: SystemNode.init(_SystemNotesTemplates.distributions),
    
    Vendors: SystemNode.init(_SystemNotesTemplates.distributions),
    Newvendor: SystemNode.init(_SystemNotesTemplates.distributions),
    beneficiariesVendor: SystemNode.init(_SystemNotesTemplates.distributions),
    
     AddDistributions: function(nodeObject){
        // - Show Subdistributions
        // - Show Vendor bud disabled
        // - Update Tree
        $("#Subdistributions").parent('li').removeClass("hidden");
        $("#Subdistributions").parent('li').addClass("visible");
        $("#vendors").parent('li').removeClass("hidden");
        $("#vendors").parent('li').addClass("visible");
    },
    AddSubdistribution: function(nodeObject, isFirstNode){
        // - Show Voucher Types
        // - Show Beneficiaries but disabled
        // - Update Tree

        $("#SubdistributionsList").find(' > li:first').after('<li>'+ nodeObject.code + '</li>');
    },
    AddVoucherType: function(nodeObject, isFirstNode){
        // - Enable Beneficiaries
        // - Update Tree
    },  
    AddBeneficiaries: function(nodeObject){
        // - Enable Vendors
        // - Update Tree
    },
    AddVendor: function(nodeObject, isFirstNode){
        // - Show Beneficiaries
        // - Update Tree
    }
    
}


var treeProgress = {
    distributionsChecked: false,
    subdistributionsChecked: false,
    voucherTypeChecked: false

}


/*
 app.config(['$routeProvider', function($routeProvider){
 routeProvider.when('home/distributions', {templateUrl: 'views/wizardviews/Distributions.html', controller: DistributionsController}).otherwise({redirectTo: '/'});
 }]);
 */

/*
 app.factory('WizardViewsService', ['ApplicationManagerDataProvider', function (ApplicationManagerDataProvider) {
 var dataFactory = {};
 dataFactory.getPrograms = function () {
 ApplicationManagerDataProvider.getPrograms().success(function (data) {
 var data = data["data"]["program"];
 $.getScript('include/ViewModels/Core/Program.js', function ()
 {
 var program = new Program();
 var programs = program.parseArray(data);  
 return programs; 
 });
 });
 };
 return dataFactory;
 }]);
 */





function GetHTML(htmlPage) {
    var fullPath = _BaseOutterHtmlPath + htmlPage;
    $.get(fullPath, function (data) {
        return data + "";
    });
}

function replaceElement(el){
    var parent = el.parentNode;
    console.log(parent);
    parent.removeChild(el);
    parent.appendChild(el);
}

$(document).ready(function () {    
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
            if($(this).hasClass("SystemNode"))
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