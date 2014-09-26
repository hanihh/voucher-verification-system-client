/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});

var Beneficiary = Base.extend({
    init: function () {
        this.id = 0;
        this.create_date = "";
        this.update_date = "";
        this.registration_code = "";
        this.delete_at = "";
        this.remote_image = "";
        this.ar_name = "";
        this.en_name = "";
        this.father_name = "";
        this.mother_name = "";
        this.birth_year = 0;
        this.gender = 0;
        this.phone_number = "";
        this.family_member = 0;
        this.main_income_source = "";
        this.combine_household = "";
        this.beneficiart_status = [];
        this.community = [];
    },
    parse: function (data) {
        var beneficiary = new Beneficiary();

        var jsonObj = JSON.parse(data);
        beneficiary.id = jsonObj.id;
        beneficiary.create_date = jsonObj.create_date;
        beneficiary.update_date = jsonObj.update_date;
        beneficiary.registration_code = jsonObj.registration_code;
        beneficiary.delete_at = jsonObj.delete_at;
        beneficiary.remote_image = jsonObj.remote_image;
        beneficiary.ar_name = jsonObj.ar_name;
        beneficiary.en_name = jsonObj.en_name;
        beneficiary.father_name = jsonObj.father_name;
        beneficiary.mother_name = jsonObj.mother_name;
        beneficiary.birth_year = jsonObj.birth_year;
        beneficiary.gender = jsonObj.gender;
        beneficiary.phone_number = jsonObj.phone_number;
        beneficiary.family_member = jsonObj.family_member;
        beneficiary.main_income_source = jsonObj.main_income_source;
        beneficiary.combine_household = jsonObj.combine_household;
       
        for(x in jsonObj.beneficiart_status)
        {
            var beneficiart_status = new Beneficiart_status();
            beneficiary.beneficiart_status.append(beneficiart_status.parse(x));
        }
        
        for(x in jsonObj.community)
        {
            var community = new Community();
            beneficiary.beneficiart_status.append(community.parse(x));
        }
        
        return beneficiary;
    }
});