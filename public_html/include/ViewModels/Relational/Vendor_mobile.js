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
        this.id = null;
        this.distribution_id = "";
        this.vendor_id = "";
        this.phones = [];
    },
    parse: function (data) {
        var vendor_mobile = new Vendor_mobile();

        var jsonObj = data;
        vendor_mobile.id = jsonObj['id'];
        vendor_mobile.distribution_id = jsonObj['distribution_id'];
        vendor_mobile.vendor_id = jsonObj['vendor_id'];

        return vendor_mobile;
    },
    Split: function() {       
        var splitedObjects = [];
        for(i=0; i<this.phones.length; i++) {     
            splitedObjects.push({id:null, distribution_id: this.distribution_id, vendor_id: this.vendor_id, phone_id: this.phones[i][0].id});
        }
        return splitedObjects;
    }
});