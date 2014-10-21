/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var Subdistribution = Base.extend({

    init: function() {
        this.id = "";
        this.code = "";
        this.start_date = "";
        this.end_date = "";
        this.note = ""
        this.community_id = 0;         
        this.status_id = 0;
        this.distribution_id = 0;
    },
    
     parse: function(data){
            var subdistribution = new Subdistribution();
           
            var jsonObj = data; 
            
            subdistribution.id = jsonObj['id'];
            subdistribution.code = jsonObj['code'];
            subdistribution.start_date = (jsonObj['start_date'] == null ? "" : jsonObj['start_date']);
            subdistribution.end_date = (jsonObj['end_date'] == null ? "" : jsonObj['end_date']);
            subdistribution.note = jsonObj['note'];                     
            subdistribution.community_id = jsonObj['community']['id'];
            subdistribution.status_Id = jsonObj['status']['id'];
             
            return subdistribution;
        }
});