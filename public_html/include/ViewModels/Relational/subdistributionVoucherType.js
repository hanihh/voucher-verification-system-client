/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var SubdistributionVoucherType = Base.extend({

    init: function() {
        this.id=null;
        this.type_id= "" ;
        this.expiration_date= "" ;
        this.value="" ;
        this.subdistribution_id="";   
    },
    
     parse: function(data){
            var subdistributionVoucherType = new SubdistributionVoucherType();
           
            var jsonObj = data; 
            
            subdistributionVoucherType.id = jsonObj['id'];
            subdistributionVoucherType.type_id = jsonObj['type_id'];
            subdistributionVoucherType.expiration_date = jsonObj['expiration_date'];
            subdistributionVoucherType.value = jsonObj['value'];
            subdistributionVoucherType.subdistribution_id = jsonObj['subdistribution']['id'];
            return subdistributionVoucherType;
        }
});