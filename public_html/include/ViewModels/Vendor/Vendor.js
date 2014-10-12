/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});


var Vendor = Base.extend({

    init: function() {
        this.id = 0;
        this.code = "";   
        this.en_name = "";
        this.ar_name = "";
        this.create_date = "";
        this.status = "";
        this.type = "";
        this.delete_at = "";
    },
    
     parse: function(data){
            var vendor = new Vendor();
            var jsonObj = data; 
                              
            vendor.id = jsonObj['id'];
            vendor.en_name = jsonObj['en_name'];
            vendor.ar_name = jsonObj['ar_name'];
            vendor.code = jsonObj['code'];
            vendor.create_date = jsonObj['create_date'];
            vendor.status = jsonObj['status'];
            vendor.type = jsonObj['type'];
            vendor.delete_at = jsonObj['delete_at'];
           
            return vendor;
        },
        
    parseArray: function(array){
        var parsedArray = [];  
        var vendor = new Vendor();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(vendor.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});