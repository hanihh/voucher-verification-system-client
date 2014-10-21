/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});

var Governorate = Base.extend({
    init: function() {    
        this.id = null;
        this.ar_name = "";
        this.en_name = "";
        this.code = "";
        this.country_id = 0;               
        //this.districts = [];
    },
    parse: function(data){
            var governorate = new Governorate();
            
             var jsonObj = data;             
            governorate.id = jsonObj['id'];
            governorate.en_name = jsonObj['en_name'];
            governorate.ar_name = jsonObj['ar_name'];
            governorate.code = jsonObj['code'];
            governorate.country_id = jsonObj['country']['id'];
          
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
