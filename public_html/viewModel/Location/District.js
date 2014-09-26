/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("../Base.js", function(){});

var District = Base.extend({
    init: function(id, code, ar_name, en_name) {
        this.id = id;
        this.code = code;
        this.ar_name = ar_name;
        this.en_name = en_name;
        this.governorate = "";           
        this.subdistricts = [];
    },
    parse: function(data){
        var district = new District();            
        var jsonObj = JSON.parse(data);  

        district.id = jsonObj.id;
        district.en_name = jsonObj.en_name;
        district.ar_name = jsonObj.ar_name;
        district.code = jsonObj.code;
        district.governorate = jsonObj.governorate;
        
        for(x in jsonObj.subdistricts)
        {
            var subdistrict = new Subdistrict();           
            district.subdistricts.append(subdistrict.parse(x));
        }

        return district;
    }
});
