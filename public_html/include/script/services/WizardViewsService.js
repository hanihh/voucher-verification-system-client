/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.factory('WizardViewsService', ['$http', function ($http) {
        var dataFactory = {};
        dataFactory.getPrograms = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/program'});
        };
        dataFactory.getDonors = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/donor'});
        };
        dataFactory.getCountries = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/country'});
        };
        dataFactory.getGovernorates = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/governorate'});
        };
        dataFactory.getDistricts = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/district'});
        };
        dataFactory.getSubdistricts = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/subdistrict'});
        };
        dataFactory.getCommunities = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/community'});
        };
        dataFactory.getVoucherTypes = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/VoucherType'});
        };
        dataFactory.getBeneficiaries = function () {
            return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/Beneficiary'});
        };
        dataFactory.getVendors = function () {
             return $http({method: 'GET', url: 'http://localhost:8080/vvs_v2/index.php/api/Vendor'});
        };
        dataFactory.createDistribution = function (Distribution) {
            var stringify = JSON.stringify(Distribution);
            console.log(stringify);
            return $http.post('http://localhost:8080/vvs_v2/index.php/api/distribution/', stringify);
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