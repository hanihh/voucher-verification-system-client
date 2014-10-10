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
        this.create_date = "";
        this.delete_at = "";
        this.note = ""
        this.communityId = 0;
         this.community = "";
    },
    
     parse: function(data){
            var subdistribution = new Subdistribution();
           
            var jsonObj = data; 
            
            subdistribution.id = jsonObj['id'];
            subdistribution.code = jsonObj['code'];
            subdistribution.start_date = jsonObj['start_date'];
            subdistribution.end_date = jsonObj['end_date'];
            subdistribution.create_date = jsonObj['create_date'];
            subdistribution.delete_at = jsonObj['delete_at'];
            subdistribution.note = jsonObj['note'];         
            subdistribution.community = jsonObj['community']
            subdistribution.communityId = jsonObj['community']['id'];
            
            return subdistribution;
        }
});