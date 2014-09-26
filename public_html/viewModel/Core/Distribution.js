/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Distribution = Base.extend({

    init: function() {
        this.id = "";
        this.start_date = "";
        this.end_date = "";
        this.online = "";
        this.program = "";
        this.doner = "";
        this.subdistributions = [];
    },
    
     parse: function(data){
            var distribution = new Distribution();
            
            var jsonObj = JSON.parse(data);    
            distribution.id = jsonObj.id;          
            distribution.start_date = jsonObj.start_date;
            distribution.end_date = jsonObj.end_date;
            distribution.online = jsonObj.online;
            distribution.program = jsonObj.program;
            distribution.doner = jsonObj.doner;
        
            for (x in jsonObj.subdistributions)
            {
                var subdistribution = new Subdistribution();           
                distribution.subdistributions.append(subdistribution.parse(x));
            }
          
        
            return distribution;
        }
});