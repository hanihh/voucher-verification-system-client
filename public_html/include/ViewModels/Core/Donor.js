/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("include/ViewModels/Base.js", function () {
});


var Donor = Base.extend({
    init: function () {
        this.id = "";
        this.name = "";
        this.logo_path = "";
        this.slogan_en = "";
        this.slogan_ar = "";
        this.distributions = [];
    },
    parse: function (data) {
        var donor = new Donor();
    var jsonObj = data;
        donor.id = jsonObj['id'];
        donor.name = jsonObj['name'];
        donor.logo_path = jsonObj['logo_path'];
        donor.slogan_en = jsonObj['slogan_en'];
        donor.slogan_ar = jsonObj['slogan_ar'];
        /*           
         for (x in jsonObj.distributions)
         {
         var distribution = new Distribution();           
         doner.distributions.append(distribution.parse(x));
         }
         */
        return donor;
    },
    parseArray: function (array) {
        var parsedArray = [];
        var donor = new Donor();
        for (i = 0; i < array["length"]; i++) {
            parsedArray.push(donor.parse(array[i]));
        }
        return parsedArray;
    }
});