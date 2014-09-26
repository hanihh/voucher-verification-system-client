/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Program = Base.extend({

    init: function() {
        this.id = "";
        this.name = "";
        this.code = "";
        this.create_date = "";
        this.delete_at = "";
        this.codes = [];
        this.voucher_types = [];
        this.vendor_types = [];
        this.distributions = [];
    },
    
     parse: function(data){
            var program = new Program();
            
            var jsonObj = JSON.parse(data);    
            program.id = jsonObj.id;
            program.name = jsonObj.name;
            program.code = jsonObj.code;
            program.create_date = jsonObj.create_date;
            program.delete_at = jsonObj.delete_at;      
                       
            for (x in jsonObj.codes)
            {
                var code = new Code();           
                program.codes.append(code.parse(x));
            }
          
            for (x in jsonObj.voucher_types)
            {
                var voucher_type = new Voucher_type();           
                program.voucher_types.append(voucher_type.parse(x));
            }
          
            for (x in jsonObj.vendor_types)
            {
                var vendor_type = new Vendor_type();           
                program.Vendor_types.append(vendor_type.parse(x));
            }
          
            for (x in jsonObj.distributions)
            {
                var distribution = new Distribution();           
                program.Distributions.append(distribution.parse(x));
            }
          
            return program;
        }
});