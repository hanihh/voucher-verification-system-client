/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Vendor_type = Base.extend({

    init: function() {
        this.id = 0;
        this.name = "";   
        this.code = "";
        this.create_date = "";
        this.internal = 0;
        this.program = "";
        this.delete_at = "";
        this.vendors = [];
    },
    
     parse: function(data){
            var vendor_type = new Vendor_type();
            
            var jsonObj = JSON.parse(data);    
            Vendor_type.id = jsonObj.id;
            Vendor_type.name = jsonObj.name;
            Vendor_type.code = jsonObj.code;
            Vendor_type.create_date = "";
            Vendor_type.delete_at = jsonObj.delete_at;
            Vendor_type.internal = jsonObj.internal;
            Vendor_type.program = jsonObj.program;
            
            for (x in jsonObj.vendors)
            {
                var vendor = new Vendor();           
                vendor_type.vendors.append(vendor.parse(x));
            }
            
            for (x in jsonObj.subdistributions)
            {
                var subdistribution = new Subdistribution();           
                vendor_type.subdistributions.append(subdistribution.parse(x));
            }
            
            return vendor_type;
        }
});