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
            url: '/distributions',
            templateUrl: 'views/wizardviews/Distributions.html'
        }).state('subdistribution', {
            url: '/subdistribution/:id',
            controller: 'subdistributionController',
            templateUrl: 'views/wizardviews/Subdistribution.html'
        }).state('subdistributionsreport', {
            url: '/subdistributionsreport',
            templateUrl: 'views/wizardviews/SubdistributionsReport.html'
        }).state('vendor', {
            url: '/vendor/:id',
            templateUrl: 'views/wizardviews/vendor.html'
        }).state('vendorreport', {
            url: '/vendorreport',
            templateUrl: 'views/wizardviews/vendorReport.html'
        }).state('vouchertype', {
            url: '/vouchertype/:id',
            templateUrl: 'views/wizardviews/vouchertype.html'
        }).state('beneficiaryDist', {
            url: '/beneficiaryDist',
            templateUrl: 'views/wizardviews/BeneficiaryDist.html'
        }).state('beneficiaryVendor', {
            url: '/beneficiaryVendor',
            templateUrl: 'views/wizardviews/BeneficiaryVendor.html'
        });
        ;

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
