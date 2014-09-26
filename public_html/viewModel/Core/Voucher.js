/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Voucher = Base.extend({

    init: function() {
        this.id = "";
        this.code = "";
        this.create_date = "";
        this.delete_at = "";
        this.redeem_date = "";
        this.distribution_voucher = "";
        this.beneficiary = "";
        this.vendor = "";
        this.voucher_status = "";
    },
    
     parse: function(data){
            var voucher = new Voucher();
            
            var jsonObj = JSON.parse(data);    
            voucher.id = jsonObj.id;
            voucher.code = jsonObj.code;
            voucher.create_date = jsonObj.create_date;
            voucher.delete_at = jsonObj.delete_at;
            voucher.redeem_date = jsonObj.redeem_date;
            voucher.distribution_voucher = jsonObj.distribution_voucher;
            voucher.beneficiary = jsonObj.beneficiary;
            voucher.vendor = jsonObj.vendor;
            voucher.voucher_status = jsonObj.voucher_status;
                     
            return voucher;
        }
});