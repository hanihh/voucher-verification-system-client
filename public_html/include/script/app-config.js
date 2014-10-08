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
        }).state('newsubdistribution', {
            url: '/newsubdistribution',
            templateUrl: 'views/wizardviews/Subdistributions.html'
        }).state('subdistributionsreport', {
            url: '/subdistributionsreport',
            templateUrl: 'views/wizardviews/SubdistributionsReport.html'
        }).state('newvendor', {
            url: '/newvendor',
            templateUrl: 'views/wizardviews/newvendor.html'
        }).state('newvouchertype', {
            url: '/newvouchertype',
            templateUrl: 'views/wizardviews/newvouchertype.html'
        }).state('beneficiariesDist', {
            url: '/beneficiariesDist',
            templateUrl: 'views/wizardviews/NewBeneficiarySubDist.html'
        });

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }]);
