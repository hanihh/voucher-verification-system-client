/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.factory('SharedPropertiesService', function () {
    var tree = '';    
    var DistributionId = -1;
    
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
        
        getSubdistributionIdForNewVoucherValue: function() {
            return tree.getAddTypeSubdistributionId();
        }
    };
});
