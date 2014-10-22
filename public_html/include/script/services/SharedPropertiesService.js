/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.factory('SharedPropertiesService', function () {
    var tree = '';    
    var DistributionId = -1;
    var DistributionStatus = true;
    var DistributionEndDate = "";
    return {
        getTree: function () {
            return tree;
        },
        setTree: function (value) {
            tree = value;
        },
        
        getDistributionId: function(){
             return DistributionId;
        },
        setDistributionId: function(value){
              DistributionId = value;
        },
        getDistributionStatus: function() {
               return DistributionStatus;
        },
        setDistributionStatus: function(value) {
              DistributionStatus = (value == 1 ? true : false) ;
        },
        getDistributionEndDate: function() {
              return  DistributionEndDate; 
        },
        setDistributionEndDate: function(value) {
              DistributionEndDate = value; 
        },
        getSubdistributionIdForNewVoucherValue: function() {
            return tree.getAddTypeSubdistributionId();
        },     
         getSubdistributionIdForBeneficiary: function() {
            return tree.getBeneficiarySubdistributionId();
        },     
    };
});
