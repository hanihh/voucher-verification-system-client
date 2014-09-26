/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Voucher_type = Base.extend({

    init: function() {
        this.id = "";
        this.name = "";
        this.create_date = "";
        this.delete_at = "";
        this.arabic_text = "";
        this.english_text = "";
        this.program = "";
        this.distribution_vouchers = [];
    },
    
     parse: function(data){
            var voucher_type = new Voucher_type();
            
            var jsonObj = JSON.parse(data);    
            voucher_type.id = jsonObj.id;
            voucher_type.name = jsonObj.name;
            voucher_type.create_date = jsonObj.create_date;
            voucher_type.delete_at = jsonObj.delete_at;      
            voucher_type.arabic_text = jsonObj.arabic_text;
            voucher_type.english_text = jsonObj.english_text;
            voucher_type.program = jsonObj.program;
            
            for (x in jsonObj.distribution_vouchers)
            {
                var distribution_voucher = new Distribution_voucher();           
                voucher_type.distribution_vouchers.append(distribution_voucher.parse(x));
            }
                     
            return voucher_type;
        }
});