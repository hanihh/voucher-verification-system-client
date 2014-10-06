/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getScript("../Base.js", function () {
});


var Code = Base.extend({

    init: function() {
        this.code = "";
        this.beneficiary = "";
        this.program = "";
    },
    
     parse: function(data){
            var code = new Code();
            
            var jsonObj = JSON.parse(data);    
            code.code = jsonObj.code;
            code.beneficiary = jsonObj.beneficiary;
            code.program = jsonObj.program;                           
        
            return code;
        }
});