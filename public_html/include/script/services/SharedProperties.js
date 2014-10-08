/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.factory('sharedProperties', function () {
    var distributionChecked = '';

    return {
        getProperty: function () {
            return distributionChecked;
        },
        setProperty: function (value) {
            distributionChecked = value;
        }
    };
});
