/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("include/ViewModels/Base.js", function () {
});

var Subdistrict = Base.extend({
    init: function(id, code, ar_name, en_name) {
        this.id = id;
        this.code = code;
        this.ar_name = ar_name;
        this.en_name = en_name;
        this.district = "";                           
        this.communities = [];       
    },
    parse: function(data){
            var subdistrict = new Subdistrict();
            var jsonObj = data;
            
            subdistrict.id = jsonObj['id'];
            subdistrict.en_name = jsonObj['en_name'];
            subdistrict.ar_name = jsonObj['ar_name'];
            subdistrict.code = jsonObj['code'];
            subdistrict.district = jsonObj['district'];
            /*
            for (x in jsonObj.District)
            {
                var community = new Community();           
                subdistrict.communities.append(community.parse(x));
            }
            */
            return subdistrict;
     },
        
    parseArray: function(array){
        var parsedArray = [];  
        var subdistrict = new Subdistrict();
                 

        for (i = 0; i < array["length"]; i++) {             
            parsedArray.push(subdistrict.parse(array[i]));
        }
        
           
        return parsedArray;
    }
});
