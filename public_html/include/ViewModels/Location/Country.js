/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});

var Country = Base.extend({       
    init: function(id, name, code) {
        this.id = id;
        this.name = name;
        this.code = code;    
        //this.governorates = [];
    }, 
    
    parse: function(data){
            var country = new Country();
            
             var jsonObj = data;
            country.id = jsonObj['id'];
            country.name = jsonObj['name'];
            country.code = jsonObj['code'];
            /*
            for(x in jsonObj.governorates)
            {
                var gov = new Governorate();           
                country.governorates.append(gov.parse(x));
            }
            */
            return country;
    },
        
    parseArray: function(array){
        var parsedArray = [];  
        var country = new Country();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(country.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});



