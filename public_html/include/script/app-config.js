/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'USER_ROLES', function ($urlRouterProvider, $stateProvider, $httpProvider, USER_ROLES) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {            
            url: "/home",
            templateUrl: 'views/home.html'             
        })
//                .state('Login', {            
//            url: "/Login",
//            templateUrl: 'views/Login.html'          
//        })
                .state('viewdistributions', {            
            url: "/viewdistributions",      
            controller: 'ViewDistributionsController',
            templateUrl: 'views/wizardviews/Empty.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('viewvouchertypes', {            
            url: "/viewvouchertypes",      
            controller: 'ViewVoucherTypesController',
            templateUrl: 'views/voucherType/ViewVoucherTypes.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }          
        }).state('viewvendors', {            
            url: "/viewvendors",      
            controller: 'ViewVendorsController',
             templateUrl: 'views/vendor/ViewVendors.html' ,
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }          
        }).state('viewmobiles', {            
            url: "/viewmobiles",      
            controller: 'ViewMobilesController',
            templateUrl: 'views/mobile/ViewMobiles.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }          
        }).state('addvouchertype', {            
            url: "/addvouchertype",      
            controller: 'AddVoucherTypeController',
            templateUrl: 'views/wizardviews/AddVoucherType.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }          
        }).state('distributions', {
            url: '/distributions/:dist_id',                        
            controller: 'DistributionController',
            templateUrl: 'views/wizardviews/Distributions.html',
             data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('subdistribution', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id',              
            controller: 'subdistributionController',
            templateUrl: 'views/wizardviews/Subdistribution.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('subdistributionsreport', {            
            url: '/distributions/:dist_id/subdistributionsreport',
            controller: 'SubdistributionReportController',
            templateUrl: 'views/wizardviews/SubdistributionsReport.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('vendor', {            
            url: '/distributions/:dist_id/vendor/:vendor_id',
               controller: 'VendorController',
                templateUrl: 'views/wizardviews/Vendor.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('vendorsreport', {
            url: '/distributions/:dist_id/vendorsreport',
            controller: 'VendorReportController',
            templateUrl: 'views/wizardviews/VendorsReport.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('vouchertype', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id/vouchertype/:vouchertype_id',   
            controller: 'VoucherTypeController',
            templateUrl: 'views/wizardviews/VoucherType.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              } 
        }).state('vouchertypesreport', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id/vouchertypesreport',            
            controller: 'VoucherTypeReportController',
            templateUrl: 'views/wizardviews/VoucherTypesReport.html' ,
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }           
        }).state('beneficiaryDist', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id/beneficiaryDist',
            controller:'beneficiaryDistController',
            templateUrl: 'views/wizardviews/BeneficiaryDist.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        }).state('beneficiaryVendor', {
            url: '/distributions/:dist_id/vendor/:vendor_id/beneficiaryVendor',
            controller:'beneficiaryVendorController',
            templateUrl: 'views/wizardviews/BeneficiaryVendor.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
              }
        });

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);



/*
 app.config(['$routeProvider', function ($routeProvider) {
 
 $routeProvider.when('/home', {
 templateUrl: 'views/home.html'
 }).when('/distributions', {
 templateUrl: 'views/wizardviews/Distributions.html'
 }).when('/subdistribution/:id', {
 templateUrl: 'views/wizardviews/Subdistribution.html'
 }).when('/subdistributionsreport', {
 templateUrl: 'views/wizardviews/SubdistributionsReport.html'
 }).when('/vendor/:id', {
 templateUrl: 'views/wizardviews/vendor.html'
 }).when('/vendorreport', {
 templateUrl: 'views/wizardviews/vendorReport.html'
 }).when('/vouchertype/:id', {
 templateUrl: 'views/wizardviews/vouchertype.html'
 }).when('/beneficiaryDist', {
 templateUrl: 'views/wizardviews/BeneficiaryDist.html'
 }).when('/beneficiaryVendor', {
 templateUrl: 'views/wizardviews/BeneficiaryVendor.html'
 });
}]);
 */
/*
 $httpProvider.defaults.useXDomain = true;
 delete $httpProvider.defaults.headers.common['X-Requested-With'];
 */
