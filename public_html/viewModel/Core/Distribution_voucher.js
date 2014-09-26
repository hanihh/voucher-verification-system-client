/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Distribution_voucher = Base.extend({

    init: function() {
        this.id = "";
        this.expiration_date = "";
        this.create_date = "";
        this.delete_at = "";
        this.value = 0.0;
        this.type = "";
        this.distribution = "";
        this.vouchers = [];
    },
    
     parse: function(data){
            var distribution_voucher = new Distribution_voucher();
            
            var jsonObj = JSON.parse(data);    
            distribution_voucher.id = jsonObj.id;
            distribution_voucher.expiration_date = jsonObj.expiration_date;
            distribution_voucher.create_date = jsonObj.create_date;
            distribution_voucher.delete_at = jsonObj.delete_at;      
            distribution_voucher.value = jsonObj.value;
            distribution_voucher.type = jsonObj.type;
            distribution_voucher.distribution = jsonObj.distribution;
            
            for (x in jsonObj.vouchers)
            {
                var voucher = new Voucher();           
                distribution_voucher.vouchers.append(voucher.parse(x));
            }
                     
            return distribution_voucher;
        }
});