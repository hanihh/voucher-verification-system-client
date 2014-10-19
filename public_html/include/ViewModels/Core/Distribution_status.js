/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var Distribution_status = Base.extend({
    init: function () {
        this.id = "";
        this.name = "";   
    },
    parse: function (data) {
        var distribution_status = new Distribution_status();

        var jsonObj = data;
        distribution_status.id = jsonObj["id"];
        distribution_status.name = jsonObj["name"];

        return distribution_status;
    },
        
    parseArray: function(array){
        var parsedArray = [];  
        var distribution_status = new Distribution_status();
                 
        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(distribution_status.parse(array[i]));
        }
                   
        return parsedArray;
    }
});