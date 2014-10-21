/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var Distribution = Base.extend({

    init: function() {
        this.id = "";
        this.name = "";
        this.en_title = "";
        this.ar_title = "";
        this.start_date = "";
        this.end_date = "";
        this.online = "";
        this.program_id = 0;
        this.donor_id = 0;
        //this.subdistributions = [];
    },
    
     parse: function(data){
            var distribution = new Distribution();
            
            var jsonObj = data;    
            distribution.id = jsonObj['id'];   
                  distribution.name = jsonObj['name'];  
            distribution.title_en = jsonObj['title_en'];   
            distribution.title_ar = jsonObj['title_ar'];        
            distribution.start_date = (jsonObj['start_date'] == null ? "" : jsonObj['start_date']);
            distribution.end_date = (jsonObj['end_date'] == null ? "" : jsonObj['end_date']);
            distribution.online = jsonObj['online'];
            distribution.program_id = jsonObj['program']["id"];
            distribution.donor_id = jsonObj['donor']["id"];
        
            return distribution;
        }
});