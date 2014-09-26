/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Phone = Base.extend({

    init: function() {
        this.id = 0;
        this.model = "";   
        this.imei = "";
        this.create_date = "";
        this.delete_at = "";
        this.available = "";
        this.vendor_mobiles = [];        
    },
    
     parse: function(data){
            var phone = new Phone();
            
            var jsonObj = JSON.parse(data);    
            phone.id = jsonObj.id;
            phone.model = jsonObj.model;
            phone.imei = jsonObj.imei;
            phone.create_date = jsonObj/create_date;
            phone.delete_at = jsonObj.delete_at;
            phone.available = jsonObj.type;
                       
            for (x in jsonObj.vendor_mobiles)
            {
                var vendor_mobile = new Vendor_mobile();           
                phone.vendor_mobiles.append(vendor_mobile.parse(x));
            }
            
            return phone;
        }
});