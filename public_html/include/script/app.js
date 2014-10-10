/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ui.router']);
var _BaseOutterHtmlPath = "views/wizardviews/";


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
      
        setTimeout( function(){ 
    angular.bootstrap(document, ['app']);
    alert("Done");
  }
 , 5000 );
    */
    
    //$("#Subdistributions").attr("data-jstree", '{ "disabled" : true }');
    //$("#tree_1").jstree("refresh");
    /*
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
*/

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