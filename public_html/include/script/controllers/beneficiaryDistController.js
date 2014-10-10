/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//app.controller('DistributionsController', ['$scope', '$http', 'sharedProperties', function ($scope, $http, sharedProperties) {
app.controller('beneficiaryDistController', ['$scope', '$rootScope', 'WizardViewsService', function ($scope, $rootScope, WizardViewsService) {                        
        $scope.beneficiary = {};
        $scope.filter = {};
        
        
        $.getScript('include/ViewModels/Beneficiary/Beneficiary.js', function ()
        {
            // script is now loaded and executed.
            // put your dependent JS here.
            WizardViewsService.getBeneficiaries().success(function (data) {
                var data = data["data"]["beneficiary"];
    
                var beneficiary = new Beneficiary();
                $scope.beneficiaries = beneficiary.parseArray(data);
                $('#datatable_ajax').dataTable( {
                    "aaData": BulidTable($scope.beneficiaries)
                });
                
                
                
         var checkedBenesIds = [];            
       $(".ChooseCheckBox").live("click", function(){
           if ($(this).is(':checked'))
           {
                $('#tags_2').addTag($(this).attr("value"));
                alert(1);
                
           } else {
                $('#tags_2').removeTag($(this).attr("value"));
           }
        
       });
//              var myObj = {
//                    1: [1, [2], 3],
//                    2: [4, 5, [6]]
//                };
//                
//                var array = $.map($scope.beneficiaries, function(value, index) {
//                    return [value];
//                });
//                
          
   //$('#datatable_ajax').dataTable( {
//                     "aaData": JSON.stringify( array)
                 //});
            });
        });
        
        /*
        $scope.Save = function (beneficiary) {
            //sharedProperties.setProperty('Checked');
            WizardViewsService.createDistribution(dist);
            treeProgress.distributionsChecked = true;
            //  alert($rootScope.treeProgress.distributionsChecked);
        }
        */
  
       
       $scope.Filter = function(filter){
            console.log(filter);
            /*
             WizardViewsService.getBeneficiaries(filter).success(function (data) {
                var data = data["data"]["beneficiary"];
    
                var beneficiary = new Beneficiary();
                $scope.beneficiaries = beneficiary.parseArray(data);
            });
            */
       }
    }]);
/*
   $('#datatable_ajax').dataTable( {
        "aaData": [        
            [ '<input type="checkbox" name="id[]" >', "Internet Explorer 4.0", "Win 95+", 4 ],
            [ '<input type="checkbox" name="id[]" >', "Internet Explorer 5.0", "Win 95+", 5 ],
            [ "", "Internet Explorer 5.5", "Win 95+", 5.5],
            [ "", "Internet Explorer 6.0", "Win 98+", 6],
            [ "", "Internet Explorer 7.0", "Win XP SP2+", 7],
            [ "", "Firefox 1.5", "Win 98+ / OSX.2+", 1.8 ],
            [ "", "Firefox 2", "Win 98+ / OSX.2+", 1.8 ],
            [ "", "Firefox 3", "Win 2k+ / OSX.3+", 1.9 ],
            [ "", "Safari 1.2", "OSX.3", 125.5 ],
            [ "", "Safari 1.3", "OSX.3", 312.8],
            [ "", "Safari 2.0", "OSX.4+", 419.3 ],
            [ "", "Safari 3.0", "OSX.4+", 522.1 ]
        ]      
    } );

      $status = $status_list[rand(0, 2)];
        $id = ($i + 1);
        $records["data"][] = array(
          '<input type="checkbox" name="id[]" value="'.$id.'">',
          $id,
          '12/09/2013',
          'Jhon Doe',
          'Jhon Doe',
          '450.60$',
          rand(1, 10),
          '<span class="label label-sm label-'.(key($status)).'">'.(current($status)).'</span>',
          '<a href="javascript:;" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>',

    */
   
   
   function BulidTable(data) {      
        var records = [];     
  
      for(i=0; i<data.length; i++){
          var rowData = data[i];
          var rowRecord =[
            '<input type="checkbox" class="ChooseCheckBox" name="'+ rowData['id'] +'" value="'+ rowData['registration_code'] +'"valueName="' + rowData['registration_code'] + '">',
            rowData.registration_code,
            rowData.en_name,
            rowData.father_name,
            rowData.birth_year,  
            ''
          ];
          records.push(rowRecord);
      }
      return records;
   }