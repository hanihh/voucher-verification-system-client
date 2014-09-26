/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$.getScript("../Base.js", function () {
});


var Vendor_status = Base.extend({

    init: function() {
        this.id = 0;
        this.name = "";   
        this.description = "";
        this.create_date = "";
        this.delete_at = "";
        this.vendors = [];
    },
    
     parse: function(data){
            var vendor_status = new Vendor_status();
            
            var jsonObj = JSON.parse(data);    
            vendor_status.id = jsonObj.id;
            vendor_status.name = jsonObj.name;
            vendor_status.create_date = "";
            vendor_status.description = "";
            vendor_status.delete_at = jsonObj.delete_at;
            
            for (x in jsonObj.vendors)
            {
                var vendor = new Vendor();           
                vendor_status.vendors.append(vendor.parse(x));
            }
                               
            return vendor_status;
        }
});