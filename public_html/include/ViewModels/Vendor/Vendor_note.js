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


var Vendor_note = Base.extend({

    init: function() {
        this.id = 0;
        this.text = "";
        this.create_date = "";
        this.delete_at = "";
        this.vendor = "";
    },
    
     parse: function(data){
            var vendor_note = new Vendor_note();
            
            var jsonObj = JSON.parse(data);    
            vendor_note.id = jsonObj.id;
            vendor_note.text = jsonObj.name;
            vendor_note.create_date = "";
            vendor_note.delete_at = jsonObj.delete_at;
            vendor_note.vendor = jsonObj.vendor
         
            return vendor_note;
        }
});