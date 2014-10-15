/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VendorController', ['$scope', 'WizardViewsService', 'SharedPropertiesService', function ($scope, WizardViewsService, SharedPropertiesService) {
        $scope.vendor = {
            vendor:"",
            chosenPhones: ""
        };

        $.getScript('include/ViewModels/Vendor/Vendor.js', function () {
        });
        $.getScript('include/ViewModels/Vendor/Phone.js', function () {
        });

        //Vendor
        WizardViewsService.getVendors().success(function (data) {
            var data = data["data"]["vendor"];
            var vendor = new Vendor();
            $scope.vendorItems = vendor.parseArray(data);         
        });

        // Phones
        WizardViewsService.getPhones().success(function (data) {
            var data = data["data"]["phone"];
            var phone = new Phone();
            $scope.phones = phone.parseArray(data);         
            
            //Function exists in the view file (html file)
            InitImeiTypeahead($scope.phones);
        });

        $scope.Save = function (vendor) {
            var model = {
                vendor_id: vendor.id,
                phones: vendor.chosenPhones,                      
                subdistribution_id: SharedPropertiesService.getDistributionId()
            }
            console.log(vendor);
            WizardViewsService.createVendorMobile(model).success(function (data) {
                   var id = data["data"]["vendormobile"]["id"];
                   model.id = id;        
                  SharedPropertiesService.getTree().AddVendor(model);
            }); 
                  
        }
    }]);


    