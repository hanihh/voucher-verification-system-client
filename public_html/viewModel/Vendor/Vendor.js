/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("../Base.js", function () {
});


var Vendor = Base.extend({

    init: function() {
        this.id = 0;
        this.code = "";   
        this.en_name = "";
        this.ar_name = "";
        this.create_date = "";
        this.status = "";
        this.type = "";
        this.delete_at = "";
        this.vouchers = [];
        this.vendor_notes = [];
        this.vendor_mobiles = [];
    },
    
     parse: function(data){
            var vendor = new Vendor();
            
            var jsonObj = JSON.parse(data);    
            vendor.id = jsonObj.id;
            vendor.en_name = jsonObj.en_name;
            vendor.ar_name = jsonObj.ar_name;
            vendor.code = jsonObj.code;
            vendor.create_date = jsonObj.create_date;
            vendor.status = jsonObj.status;
            vendor.type = jsonObj.type;
            vendor.delete_at = jsonObj.delete_at;
                       
            for (x in jsonObj.vouchers)
            {
                var voucher = new Voucher();           
                vendor.vouchers.append(voucher.parse(x));
            }
            
            for (x in jsonObj.vendor_notes)
            {
                var vendor_note = new Vendor_note();
                vendor.vendor_notes.append(vendor_note.parse(x));
            }
            
             for (x in jsonObj.vendor_mobiles)
            {
                var vendor_mobile = new Vendor_mobile();
                vendor.vendor_mobiles.append(vendor_mobile.parse(x));
            }
            
            return vendor;
        }
});