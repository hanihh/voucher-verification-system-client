/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});

var Governorate = Base.extend({
    init: function() {    
        this.id = id;
        this.ar_name = "";
        this.en_name = "";
        this.code = "";
        this.countryId = 0;               
        //this.districts = [];
    },
    parse: function(data){
            var governorate = new Governorate();
            
             var jsonObj = data;             
            governorate.id = jsonObj['id'];
            governorate.en_name = jsonObj['en_name'];
            governorate.ar_name = jsonObj['ar_name'];
            governorate.code = jsonObj['code'];
            governorate.countryId = jsonObj['country_id'];
            /*
            for (x in jsonObj.districts)
            {
                var district = new District();           
                governorate.districts.append(district.parse(x));
            }
            */
            return governorate;
    },
        
    parseArray: function(array){
        var parsedArray = [];  
        var governorate = new Governorate();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(governorate.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});
