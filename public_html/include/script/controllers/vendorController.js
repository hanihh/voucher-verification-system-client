/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('VendorController', ['$scope', '$stateParams', 'DataProviderService', 'SharedPropertiesService', function ($scope, $stateParams, DataProviderService, SharedPropertiesService) {
 

        $.getScript('include/ViewModels/Vendor/Vendor.js', function () {
   $.getScript('include/ViewModels/Relational/Vendor_mobile.js', function () {
        $.getScript('include/ViewModels/Vendor/Phone.js', function () {
     

       $scope.vendor_mobile = new Vendor_mobile();
        
        //Vendor
        DataProviderService.getVendors().success(function (data) {
            var data = data["data"]["vendor"];
            var vendor = new Vendor();
            $scope.vendorItems = vendor.parseArray(data);         
        });

        // Phones
        DataProviderService.getPhones().success(function (data) {
            var data = data["data"]["phone"];
            var phone = new Phone();
            $scope.phones = phone.parseArray(data);         
            
            //Function exists in the view file (html file)
            InitImeiTypeahead($scope.phones, SharedPropertiesService.getDistributionStatus());
        });

        var id = ($stateParams) ? $stateParams.vendor_id : null;

        if (id)
        {
            DataProviderService.getVendorMobiles(id).success(function (data) {
                var data = data["data"]["vendor"];
                var vendor_mobile = new Vendor_mobile();
                $scope.vendor_mobile = vendor_mobile.parse(data);
                console.log( $scope.vendor_mobile );
            });
        }
        
        $scope.Save = function (vendor_mobile) {
            vendor_mobile.sub
            console.log(vendor_mobile);
            DataProviderService.createVendorMobile(vendor_mobile).success(function (data) {
                   var id = data["data"]["vendormobile"]["id"];
                   model.id = id;        
                  SharedPropertiesService.getTree().AddVendor(model,true);
            }); 
                  
        }
           });      
       });
        });
    }]);


    