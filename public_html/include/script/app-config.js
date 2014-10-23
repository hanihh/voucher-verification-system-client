/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: 'views/home.html'
        }).state('distributions', {
            url: '/distributions/:dist_id',                        
//            views:{           
//                '': {
//                    controller: 'DistributionController',
//                    templateUrl: 'views/wizardviews/Distributions.html',
//                },
//                'subdistribution@distributions': {
//                    controller: 'subdistributionController',
//                    templateUrl: 'views/wizardviews/Subdistribution.html'
//                }
//            },
               controller: 'DistributionController',
                    templateUrl: 'views/wizardviews/Distributions.html',
        }).state('distributions.subdistribution', {
            url: '/subdistribution/:subdist_id',    
              views: {
            'subdistribution': {
                  controller: 'subdistributionController',
                    templateUrl: 'views/wizardviews/Subdistribution.html'
            }
        },
//            controller: 'subdistributionController',
//                    templateUrl: 'views/wizardviews/Subdistribution.html'
   
        }).state('subdistributionsreport', {            
            url: '/subdistributionsreport',
            controller: 'SubdistributionReportController',
            templateUrl: 'views/wizardviews/SubdistributionsReport.html'
        }).state('distributions.vendor', {            
            url: '/vendor/:vendor_id',    
              views: {
                  'vendor':{
                    controller: 'VendorController',
                    templateUrl: 'views/wizardviews/vendor.html'
                  }
              }
        }).state('vendorreport', {
            url: '/vendorreport',
            controller: 'VendorReportController',
            templateUrl: 'views/wizardviews/vendorsReport.html'
        }).state('distributions.subdistribution.vouchertype', {
            url: '/vouchertype/:vouchertype_id',   
            views: {
                'vouchertype':{
                    controller: 'VoucherTypeController',
                    templateUrl: 'views/wizardviews/vouchertype.html'            
                }
            }
        }).state('vouchertypereport', {
            url: '/vouchertypereport',            
            controller: 'VoucherTypeReportController',
            templateUrl: 'views/wizardviews/vouchertypereport.html'            
        }).state('distributions.subdistribution.beneficiaryDist', {
            url: '/beneficiaryDist',
            views: {
                'beneficiaryDist':{
                    controller:'beneficiaryDistController',
                    templateUrl: 'views/wizardviews/BeneficiaryDist.html'
                }
            }
        }).state('distributions.vendor.beneficiaryVendor', {
            url: '/beneficiaryVendor',
            views:{
                'beneficiaryVendor':{
                    controller:'beneficiaryVendorController',
                    templateUrl: 'views/wizardviews/BeneficiaryVendor.html'
                }
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
