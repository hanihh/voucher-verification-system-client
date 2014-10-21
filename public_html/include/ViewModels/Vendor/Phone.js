/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var Phone = Base.extend({

    init: function() {
        this.id = null;
        this.model = "";   
        this.imei = "";
        this.create_date = "";
        this.delete_at = "";
        this.available = "";             
    },
    
     parse: function(data){
            var phone = new Phone();
            
            var jsonObj = data;    
            phone.id = jsonObj['id'];
            phone.model = jsonObj['model'];
            phone.imei = jsonObj['imei'];
            phone.create_date = jsonObj['create_date'];
            phone.delete_at = jsonObj['delete_at'];
            phone.available = jsonObj['type'];
            
            return phone;
        },
        
    parseArray: function(array){
        var parsedArray = [];  
        var phone = new Phone();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(phone.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});