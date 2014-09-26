/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("../Base.js", function(){});

var Community = Base.extend({

    init: function(id, code, ar_name, en_name) {
        this.id = id;
        this.code = code;   
        this.en_name = en_name;
        this.ar_name = ar_name;
        this.subdistrict = "";
        this.beneficiaries = [];       
        this.subdistributions = [];
    },
    
     parse: function(data){
            var community = new Community();
            
            var jsonObj = JSON.parse(data);    
            community.id = jsonObj.id;
            community.en_name = jsonObj.en_name;
            community.ar_name = jsonObj.ar_name;
            community.code = jsonObj.code;
            community.subdistrict = jsonObj.subdistrict;
            
            for (x in jsonObj.beneficiaries)
            {
                var beneficiary = new Beneficiary();           
                community.beneficiaries.append(beneficiarie.parse(x));
            }
            
            for (x in jsonObj.subdistributions)
            {
                var subdistribution = new Subdistribution();           
                community.subdistributions.append(subdistribution.parse(x));
            }
            
            return community;
        }
});