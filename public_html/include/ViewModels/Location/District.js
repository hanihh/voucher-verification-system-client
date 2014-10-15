/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});

var District = Base.extend({
    init: function() {
        this.id = 0;
        this.code = "";
        this.ar_name = "";
        this.en_name = "";
        this.governorateId = 0;           
       // this.subdistricts = [];
    },
    parse: function(data){
        var district = new District();            
       var jsonObj = data;

        district.id = jsonObj['id'];
        district.en_name = jsonObj['en_name'];
        district.ar_name = jsonObj['ar_name'];
        district.code = jsonObj['code'];
        district.governorateId = jsonObj['governorate_id'];
        /*
        for(x in jsonObj.subdistricts)
        {
            var subdistrict = new Subdistrict();           
            district.subdistricts.append(subdistrict.parse(x));
        }
*/
        return district;
    },
        
    parseArray: function(array){
        var parsedArray = [];  
        var district = new District();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(district.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});
