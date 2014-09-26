/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function(){});

var Beneficiary_status = Base.extend({
    init: function() {
        this.id = 0;
        this.name = "";
        this.create_date = "";
        this.deleted_at = "";        
    },
    parse: function(data){
        var beneficiary_status = new Beneficiary_status();            
        var jsonObj = JSON.parse(data);  

        beneficiary_status.id = jsonObj.id;
        beneficiary_status.name = jsonObj.name;
        beneficiary_status.create_date = jsonObj.create_date;
        beneficiary_status.deleted_at = jsonObj.deleted_at;
        
        return beneficiary_status;
    }
});
