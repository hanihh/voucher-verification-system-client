/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("../Base.js", function () {
});


var Vendor_mobile = Base.extend({

    init: function() {
        this.id = 0;
       this.subdistribution = "";
       this.vendor = "";
       this.phone = "";
    },
    
     parse: function(data){
            var vendor_mobile = new Vendor_mobile();
            
            var jsonObj = JSON.parse(data);    
            vendor_mobile.id = jsonObj.id;
            vendor_mobile.subdistribution = jsonObj.subdistribution;
            vendor_mobile.vendor = jsonObj.vendor;
            vendor_mobile.phone = jsonObj.phone;
                       
          
            return vendor_mobile;
        }
});