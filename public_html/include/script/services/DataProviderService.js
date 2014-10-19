/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.factory('DataProviderService', ['$http', function ($http) {
        var dataFactory = {};
        var server_url = "http://localhost/vvs_v2/index.php/";

        //*** Gets Methods ***//
        dataFactory.getDistributions = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/distribution/' + _id});
        };
        dataFactory.getSubdistributions = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/subdistribution/' + _id});
        };
        dataFactory.getSubdistributionsByFilter = function (params){
            return $http({method: 'GET', url: server_url + 'api/subdistribution/?filter='+ JSON.stringify(GetFilter(params))});
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
         dataFactory.getSubdistributionVoucherByFilter = function (params){
             //console.log(JSON.stringify(GetFilter(params)));
            return $http({method: 'GET', url: server_url + 'api/distributionvoucher/?filter='+ JSON.stringify(GetFilter(params))});
        };
        dataFactory.getBeneficiaries = function (filter) {    
            var filterString = "";
            return $http({method: 'GET', url: server_url + 'api/Beneficiary'});
        };        
         dataFactory.getBeneficiariesByFilter = function (params) {                
             return $http({method: 'GET', url: server_url + 'api/Beneficiary/?filter='+ JSON.stringify(GetFilter(params))});
        };
        dataFactory.getVendors = function () {
            return $http({method: 'GET', url: server_url + 'api/Vendor'});
        };
        dataFactory.getPhones = function () {
            return $http({method: 'GET', url: server_url + 'api/phone'});
        };
         dataFactory.getStatus = function () {
            return $http({method: 'GET', url: server_url + 'api/distributionstatus'});
        };
        //*********************//
        //*** Posts Methods ***//
        dataFactory.createDistribution = function (distribution) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
               return $http({method: 'POST', url: server_url + 'api/distribution', data: distribution});
        };
        dataFactory.createSubDistribution = function (subdistribution) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
              return $http({method: 'POST', url: server_url + 'api/subdistribution', data: subdistribution});
        };
        dataFactory.createSubdistributionVoucher = function (voucherType) {    
             $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                  return $http({method: 'POST', url: server_url + 'api/distributionvoucher', data: voucherType});
        };
        dataFactory.createVendorMobile = function (vendor) {    
             $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                  return $http({method: 'POST', url: server_url + 'api/vendormobile', data: vendor});
        };
        //*********************//
        
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
