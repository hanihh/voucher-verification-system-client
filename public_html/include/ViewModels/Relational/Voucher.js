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


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});


var Voucher = Base.extend({

    init: function(code, distribution_voucher_id, ben_id, vendor_id, status_id) {
        this.id = null;
       this.code = "";
       this.distribution_voucher_id = 0;
       this.ben_id = 0;
       this.vendor_id = 0;
       this.status_id = 0;
       
    },
    
     parse: function(data){
            var voucher = new Voucher();
            
            var jsonObj = data;                 
            voucher.id =  jsonObj['id'];
            voucher.code =  jsonObj['code'];;
            voucher.distribution_voucher_id =  jsonObj['distribution_voucher_id'];;
            voucher.ben_id =  jsonObj['ben_id'];;
            voucher.vendor_id =  jsonObj['vendor_id'];;
            voucher.status_id =  jsonObj['status_id'];;
             
            return voucher;
        },
    parseArray: function (array) {
        var parsedArray = [];
        var voucher = new Voucher();


        for (i = 0; i < array["length"]; i++) {
            parsedArray.push(voucher.parse(array[i]));
        }

        return parsedArray;
    }
});