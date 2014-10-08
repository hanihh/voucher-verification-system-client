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
            url: '/subdistribution',
            templateUrl: 'views/wizardviews/Subdistributions.html'
        }).state('subdistributionsreport', {
            url: '/subdistributionsreport',
            templateUrl: 'views/wizardviews/SubdistributionsReport.html'
        }).state('vendor', {
            url: '/vendor',
            templateUrl: 'views/wizardviews/vendor.html'
        }).state('vouchertype', {
            url: '/vouchertype',
            templateUrl: 'views/wizardviews/vouchertype.html'
        }).state('beneficiaryDist', {
            url: '/beneficiaryDist',
            templateUrl: 'views/wizardviews/BeneficiaryDist.html'
        }).state('beneficiaryVendor', {
            url: '/beneficiaryVendor',
            templateUrl: 'views/wizardviews/BeneficiaryVendor.html'
        });;

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }]);
