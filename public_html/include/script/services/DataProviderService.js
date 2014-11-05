/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.factory('DataProviderService', ['$http', function ($http) {
        var dataFactory = {};
        //var server_url = "http://hani.darkcomets.com/vvs_v2/";
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
        dataFactory.getSubdistributionsByFilter = function (params) {
            return $http({method: 'GET', url: server_url + 'api/subdistribution/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getSubdistributionsByFilterURL = function (params) {
            return server_url + 'api/subdistribution/?filter=' + JSON.stringify(GetFilter(params));
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
        dataFactory.getGovernoratesByFilter = function (params) {
            //console.log(JSON.stringify(GetFilter(params)));
            return $http({method: 'GET', url: server_url + 'api/governorate/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getDistricts = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/district/' + _id});
        };
        dataFactory.getDistrictsByFilter = function (params) {
            //console.log(JSON.stringify(GetFilter(params)));
            return $http({method: 'GET', url: server_url + 'api/district/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getSubdistricts = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/subdistrict/' + _id});
        };
        dataFactory.getSubdistrictsByFilter = function (params) {
            //console.log(JSON.stringify(GetFilter(params)));
            return $http({method: 'GET', url: server_url + 'api/subdistrict/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getCommunities = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/community/' + _id});
        };
        dataFactory.getCommunitiesByFilter = function (params) {
            //console.log(JSON.stringify(GetFilter(params)));
            return $http({method: 'GET', url: server_url + 'api/community/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getVoucherTypes = function () {
            return $http({method: 'GET', url: server_url + 'api/VoucherType'});
        };
        dataFactory.getSubdistributionVoucher = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/distributionVoucher/' + _id});
        };
        dataFactory.getSubdistributionVoucherByFilter = function (params) {
            return $http({method: 'GET', url: server_url + 'api/distributionVoucher/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getSubdistributionVoucherByFilterURL = function (params) {
            return server_url + 'api/distributionVoucher/?filter=' + JSON.stringify(GetFilter(params));
        };
        dataFactory.getBeneficiaries = function () {
            return $http({method: 'GET', url: server_url + 'api/Beneficiary'});
        };
        dataFactory.getBeneficiariesBySubdistributionId = function (subdist_id, include, withall) {
            var _include = include ? 1 : 0;
            var _withall = withall ? 1 : 0;
            return $http({method: 'GET', url: server_url + 'api/Beneficiary/GetBeneficiaryFordistribution?subdistribution_id=' + subdist_id + '&include=' + _include + '&withall=' + _withall});
        };
        dataFactory.getBeneficiariesBySubdistributionIdURL = function (subdist_id, include, withall) {
            var _include = include ? 1 : 0;
            var _withall = withall ? 1 : 0;
            return server_url + 'api/Beneficiary/GetBeneficiaryFordistribution?subdistribution_id=' + subdist_id + '&include=' + _include + '&withall=' + _withall;
        };
        dataFactory.getBeneficiariesByDistributionIdURL = function (dist_id, include, withall, withvendor) {
            var _include = include ? 1 : 0;
            var _withall = withall ? 1 : 0;
                    var _withvendor = withvendor ? 1 : 0;
            return server_url + 'api/Beneficiary/GetBeneficiaryFordistribution?distribution_id=' + dist_id + '&include=' + _include + '&withall=' + _withall + '&withvendor=' + _withvendor;
        };
        dataFactory.getBeneficiariesByFilter = function (params) {
            return $http({method: 'GET', url: server_url + 'api/Beneficiary/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getVendors = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/Vendor/' + _id});
        };
        dataFactory.getVendorsByFilter = function (params) {
            return $http({method: 'GET', url: server_url + 'api/Vendor/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getVendorsMobileByFilterURL = function (params) {
            return server_url + 'api/vendorMobile/?filter=' + JSON.stringify(GetFilter(params));
        };
        dataFactory.getVendorMobile = function (id) {
            var _id = (id) ? id : "";
            return $http({method: 'GET', url: server_url + 'api/vendorMobile/' + _id});
        };
        dataFactory.getVendorMobilesByFilter = function (params) {
            return $http({method: 'GET', url: server_url + 'api/vendorMobile/?filter=' + JSON.stringify(GetFilter(params))});
        };
        dataFactory.getPhones = function () {
            return $http({method: 'GET', url: server_url + 'api/phone'});
        };
        dataFactory.getStatus = function () {
            return $http({method: 'GET', url: server_url + 'api/distributionStatus'});
        };
        dataFactory.getPrintVoucherURL = function(distributionId, subdistributionId) {
            var _distributionId = (distributionId) ? distributionId : "";
            var _subdistributionId = (subdistributionId) ? subdistributionId : "";
            var controllerString = "";
            if (_distributionId !== "") {
                controllerString = "distribution/savePdf/" + _distributionId;
            } else if (_subdistributionId !== ""){
                controllerString = "subdistribution/savePdf/" + _subdistributionId;
            }
            
//             return $http({header: "Content-Disposition: attachment;",method: 'GET', url: server_url + controllerString});
            return server_url + controllerString;
        }
        //*********************//
        //*** Create Methods ***//
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
        dataFactory.createVoucher = function (voucher) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            return $http({method: 'POST', url: server_url + 'voucher/generate', data: voucher});
        };
        //*********************//
        //**** Delete Methods ****//
        dataFactory.RemoveVoucher = function (voucher) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            return $http({method: 'POST', url: server_url + 'voucher/remove', data: voucher});
        };
        dataFactory.RemoveVoucherVendor = function (voucher) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            return $http({method: 'POST', url: server_url + 'voucher/deleteVoucherVendor', data: voucher});
        };
        //*********************//
        //**** Put Methods ****//
        dataFactory.updateVoucherVendor = function (voucher) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            return $http({method: 'POST', url: server_url + 'voucher/updateVoucherVendor', data: voucher});
        };
        dataFactory.updateDistribution = function (distribution) {
            console.log(distribution);
            return $http({method: 'PUT', url: server_url + 'api/distribution/' + distribution.id, data: distribution});
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
