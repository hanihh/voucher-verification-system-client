/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Distribution_status = Base.extend({
    init: function () {
        this.id = "";
        this.name = "";
        this.create_date = "";
        this.delete_at = "";
        this.subdistributions = [];
    },
    parse: function (data) {
        var distribution_status = new Distribution_status();

        var jsonObj = JSON.parse(data);
        distribution_status.id = jsonObj.id;
        distribution_status.name = jsonObj.name;
        distribution_status.create_date = jsonObj.create_date;
        distribution_status.delete_at = jsonObj.delete_at;

        for (x in jsonObj.subdistributions)
        {
            var subdistribution = new Subdistribution();
            distribution_voucher.subdistributions.append(subdistribution.parse(x));
        }

        return distribution_status;
    }
});