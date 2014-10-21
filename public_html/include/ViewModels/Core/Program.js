/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var Program = Base.extend({

    init: function() {
        this.id = null;
        this.name = "";
        this.code = "";
    },
    
     parse: function(data){
            var program = new Program();
            var jsonObj = data;
            
            
            program.id = jsonObj["id"];
            program.name = jsonObj["name"];
            program.code = jsonObj["code"];
            program.create_date = jsonObj["create_date"];
            program.delete_at = jsonObj["delete_at"];      
          
            return program;
        },
        
    parseArray: function(array){
        var parsedArray = [];  
        var program = new Program();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(program.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});