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
        }).state('viewdistributions', {            
            url: "/viewdistributions",      
             controller: 'ViewDistributionsController',
        }).state('distributions', {
            url: '/distributions/:dist_id',                        
            controller: 'DistributionController',
            templateUrl: 'views/wizardviews/Distributions.html',
        }).state('subdistribution', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id',              
            controller: 'subdistributionController',
            templateUrl: 'views/wizardviews/Subdistribution.html'
        }).state('subdistributionsreport', {            
            url: '/distributions/:dist_id/subdistributionsreport',
            controller: 'SubdistributionReportController',
            templateUrl: 'views/wizardviews/SubdistributionsReport.html'
        }).state('vendor', {            
            url: '/distributions/:dist_id/vendor/:vendormobile_id',
               controller: 'VendorController',
                templateUrl: 'views/wizardviews/vendor.html'
        }).state('vendorsreport', {
            url: '/distributions/:dist_id/vendorsreport',
            controller: 'VendorReportController',
            templateUrl: 'views/wizardviews/vendorsReport.html'
        }).state('vouchertype', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id/vouchertype/:vouchertype_id',   
            controller: 'VoucherTypeController',
            templateUrl: 'views/wizardviews/vouchertype.html' 
        }).state('vouchertypereport', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id/vouchertypereport',            
            controller: 'VoucherTypeReportController',
            templateUrl: 'views/wizardviews/vouchertypereport.html'            
        }).state('beneficiaryDist', {
            url: '/distributions/:dist_id/subdistribution/:subdist_id/beneficiaryDist',
            controller:'beneficiaryDistController',
            templateUrl: 'views/wizardviews/BeneficiaryDist.html'
        }).state('beneficiaryVendor', {
            url: '/distributions/:dist_id/vendor/:vendormobile_id/beneficiaryVendor',
            controller:'beneficiaryVendorController',
            templateUrl: 'views/wizardviews/BeneficiaryVendor.html'
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
