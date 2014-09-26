/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular
        .module('app', [
            'ui.router'
        ])
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider.state('home', {
                    url:"/",
                    templateUrl : 'views/home.html'
                })
            }])
