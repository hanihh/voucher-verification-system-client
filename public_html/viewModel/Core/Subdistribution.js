/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
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
        this.community = "";
        this.distribution_status = "";   
        this.distribution_vouchers = [];
        this.vendor_mobiles = [];
    },
    
     parse: function(data){
            var subdistribution = new Subdistribution();
            
            var jsonObj = JSON.parse(data);    
            subdistribution.id = jsonObj.id;
            subdistribution.code = jsonObj.code;
            subdistribution.start_date = jsonObj.start_date;
            subdistribution.end_date = jsonObj.end_date;
            subdistribution.create_date = jsonObj.create_date;
            subdistribution.delete_at = jsonObj.delete_at;
            subdistribution.note = jsonObj.note;
            subdistribution.community = jsonObj.community;
            subdistribution.distribution_status = jsonObj.distribution_status;   
                       
            for (x in jsonObj.distribution_vouchers)
            {
                var distribution_voucher = new Distribution_voucher();           
                subdistribution.distribution_vouchers.append(distribution_voucher.parse(x));
            }
          
            for (x in jsonObj.vendor_mobiles)
            {
                var vendor_mobile = new Vendor_mobile();           
                subdistribution.vendor_mobiles.append(vendor_mobile.parse(x));
            }
            
            return subdistribution;
        }
});