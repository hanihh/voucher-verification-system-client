/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.factory('SharedPropertiesService', function () {
    var tree = '';

    return {
        getTree: function () {
            return tree;
        },
        setTree: function (value) {
            tree = value;
        }
    };
});
