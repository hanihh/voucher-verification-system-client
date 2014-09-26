/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function(){});

var Nationality = Base.extend({
    init: function() {
        this.id = 0;
        this.name = "";      
    },
    parse: function(data){
        var nationality = new Nationality();            
        var jsonObj = JSON.parse(data);  

        nationality.id = jsonObj.id;
        nationality.name = jsonObj.name;
              
        return nationality;
    }
});
