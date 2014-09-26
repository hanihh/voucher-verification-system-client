/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Doner = Base.extend({

    init: function() {
        this.id = "";
        this.name = "";
        this.logo_path = "";
        this.slogan_en = "";
        this.slogan_ar = "";
        this.distributions = [];
    },
    
     parse: function(data){
            var doner = new Doner();
            
            var jsonObj = JSON.parse(data);    
            doner.id = jsonObj.id;
            doner.name = jsonObj.name;
            doner.logo_path = jsonObj.logo_path;
            doner.slogan_en = jsonObj.slogan_en;
            doner.slogan_ar = jsonObj.slogan_ar;      
                       
            for (x in jsonObj.distributions)
            {
                var distribution = new Distribution();           
                doner.distributions.append(distribution.parse(x));
            }
          
            return doner;
        }
});