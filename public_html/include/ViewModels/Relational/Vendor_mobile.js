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


var Vendor_mobile = Base.extend({
    init: function () {
        this.id = 0;
        this.subdistribution_id = "";
        this.vendor_id = "";
        this.phone_id = "";
    },
    parse: function (data) {
        var vendor_mobile = new Vendor_mobile();

        var jsonObj = data;
        vendor_mobile.id = jsonObj['id'];
        vendor_mobile.subdistribution_id = jsonObj['subdistribution_id'];
        vendor_mobile.vendor_id = jsonObj['vendor_id'];
        vendor_mobile.phone_id = jsonObj['phone_id'];

        return vendor_mobile;
    },
    parseArray: function (array) {
        var parsedArray = [];
        var vendor_mobile = new Vendor_mobile();


        for (i = 0; i < array["length"]; i++) {
            parsedArray.push(vendor_mobile.parse(array[i]));
        }

        return parsedArray;
    }
});