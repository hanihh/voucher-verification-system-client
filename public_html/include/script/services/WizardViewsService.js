/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.factory('WizardViewsService', ['$http', function ($http) {
        var dataFactory = {};
        var server_url = "http://localhost/vvs_v2/index.php/";
        dataFactory.getPrograms = function () {
            return $http({method: 'GET', url: server_url + 'api/program'});
        };
        dataFactory.getDonors = function () {
            return $http({method: 'GET', url: server_url + 'api/donor'});
        };
        dataFactory.getCountries = function () {
            return $http({method: 'GET', url: server_url + 'api/country'});
        };
        dataFactory.getGovernorates = function () {
            return $http({method: 'GET', url: server_url + 'api/governorate'});
        };
        dataFactory.getDistricts = function () {
            return $http({method: 'GET', url: server_url + 'api/district'});
        };
        dataFactory.getSubdistricts = function () {
            return $http({method: 'GET', url: server_url + 'api/subdistrict'});
        };
        dataFactory.getCommunities = function () {
            return $http({method: 'GET', url: server_url + 'api/community'});
        };
        dataFactory.getVoucherTypes = function () {
            return $http({method: 'GET', url: server_url + 'api/VoucherType'});
        };
        dataFactory.getBeneficiaries = function () {
            return $http({method: 'GET', url: server_url + 'api/Beneficiary'});
        };
        dataFactory.getVendors = function () {
             return $http({method: 'GET', url: server_url + 'api/Vendor'});
        };
        dataFactory.createDistribution = function (Distribution) {
            var stringify = JSON.stringify(Distribution);
            console.log(stringify);
            //return $http.post(server_url + 'api/distribution/', stringify);
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