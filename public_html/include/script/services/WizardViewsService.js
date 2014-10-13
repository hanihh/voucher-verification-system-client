/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.factory('WizardViewsService', ['$http', function ($http) {
        var dataFactory = {};
        var server_url = "http://localhost:8080/vvs_v2/index.php/";

        dataFactory.getSubdistributions = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/subdistribution/' + _id});
        };
        dataFactory.getPrograms = function () {
            return $http({method: 'GET', url: server_url + 'api/program'});
        };
        dataFactory.getDonors = function () {
            return $http({method: 'GET', url: server_url + 'api/donor'});
        };
        dataFactory.getCountries = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/country/' + _id});
        };
        dataFactory.getGovernorates = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/governorate/' + _id});
        };
        dataFactory.getDistricts = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/district/' + _id});
        };
        dataFactory.getSubdistricts = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/subdistrict/' + _id});
        };
        dataFactory.getCommunities = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/community/' + _id});
        };
        dataFactory.getVoucherTypes = function () {
            return $http({method: 'GET', url: server_url + 'api/VoucherType'});
        };
        dataFactory.getBeneficiaries = function (filter) {
            /*http://localhost:8080/vvs_v2/index.php/api/Beneficiary/?filter = [
             {"property": "registration_code", "value" : CFW0009, "operator": "in"}
             , {"property": "en_name", "value" : "Mustafa", "operator": "in"}
             , {"property": "birth_year", "value" : "1013-01-01", "operator": ">="}
             , {"property": "birth_year", "value" : "2014-01-31", "operator": "<="}
             ]*/
            //  var filterString = ParseFilter(filter);       
            var filterString = "";
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/Beneficiary' + filterString});
        };
        dataFactory.getVendors = function () {
            return $http({method: 'GET', url: server_url + 'api/Vendor'});
        };
         dataFactory.getPhones = function () {
            return $http({method: 'GET', url: server_url + 'api/phone'});
        };
        dataFactory.createDistribution = function (Distribution) {
            var stringify = JSON.stringify(Distribution);
            console.log(stringify);
            //return $http.post(server_url + 'api/distribution/', stringify);
        };
        dataFactory.createDistribution = function (Distribution) {
            var stringify = JSON.stringify(Distribution);
            console.log(stringify);
            //return $http.post(server_url + 'api/distribution/', stringify);
        };
        dataFactory.createSubDistribution = function (Subdistribution) {
            //var stringify = JSON.stringify(Subdistribution);
            //console.log(stringify);
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
              return $http({method: 'POST', url: server_url + 'api/subdistribution', data: Subdistribution});
        };
     dataFactory.createSubdistributionVoucher = function (voucherType) {
            //var stringify = JSON.stringify(Subdistribution);
            //console.log(stringify);      
             $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                  return $http({method: 'POST', url: server_url + 'api/distributionvoucher', data: voucherType});
        };
        /*
         dataFactory.updateUsersFields = function (filedsObj) {
         return $http.put('/Membership/UpdateUsersFields', filedsObj);
         };
         dataFactory.deleteUser = function (user) {
         return $http.delete('/Membership/DeleteUser?UserName=' + user.UserName);
         };
         */
        return dataFactory;
    }]);
