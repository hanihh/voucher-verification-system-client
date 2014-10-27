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
        console.log(ParseFilter([
            ["id", "1", "="],
            ["name", "asdsad", "in"],
            ["date", "2015", "<"]
        ]));
    */
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

  function CreateBreadCrumbTree(data) {
        $("ul#breadcrumb").empty();
        if (data)
            for (i = 0; i < data.length; i++) {
                if (i == 0) {
                   var rightAngle = (data.length == 1 ? '<i></i>' : '<i class="fa fa-angle-right"></i>');
                    $("ul#breadcrumb").append('<li><i class="fa fa-home"></i><a> ' + data[0] + '</a>' + rightAngle);
                }
                else
                {                                
                    var rightAngle = (i ==  data.length-1 ? '<i></i>' : '<i class="fa fa-angle-right"></i>');
                    $("ul#breadcrumb").append('<li><a> ' + data[i] + '</a>' + rightAngle);
                }
            }       
    }
    
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

//The param should be array of arrays like: [[key1, value1, operator1], [key2, value2, operator2]]
function GetFilter(paramArray) {
    var filterString = [];
    for(i=0; i<paramArray.length; i++){
        filterString.push({property: paramArray[i][0] , value:paramArray[i][1], operator: paramArray[i][2]});
    }
    return filterString;
}


Date.prototype.isSameDateAs = function(pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
}

Date.prototype.isSameDateAs = function(pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
}


var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    },
    check: function(date) {
        return date.toString() == "Invalid Date" ? false : true;        
    }
}