/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('ViewDistributionsController', ['$scope', 'DataProviderService', 'SharedPropertiesService', function ($scope, DataProviderService, SharedPropertiesService) {

            DataProviderService.getDistributions().success(function (data) {                
                var distributions = data["data"]["distribution"];                             
                SharedPropertiesService.getTree().AddDistributionArray(distributions);                              
            })     
    }]);


    