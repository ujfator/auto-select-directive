// autocomplete directive with two scope inputs - source array and placeholder name

const app = angular.module("autoComplete", []);
app.controller("ctrl", function($scope) {
    $scope.mujArray = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
});

app.directive('customAutoComplete', function() {
    return {
        restrict: 'E',
        scope: {
            sourceArray: '=',
            placeholder: '='
        },
        template:
            '<div class="container">' +
            '   <div class="width100">' +
            '       <input ' +
            '       id="dropDownInput" ' +
            '       ng-class="{\'autoCompleteInputFocus\': highlightInput}" ' +
            '       class="autoCompleteInput left" ' +
            '       ng-focus="showDS()" ' +
            '       ng-blur="hideDS()" ng-keydown="autoFill($event)" ng-model="myInput" type="text" placeholder="{{placeholder}}">\n' +
            '       <div class="arrowWrapper left" ng-click="dsGenerator()" id="dropDownArrowWrapper"><span id="dropDownArrow" class="arrow"></span></div>' +
            '   </div>'+
            '   <div ng-if="resultArray.length>0" class="autoCompleteDropDown">' +
            '       <div id="dropDownResult" class="itemInDropDown" ng-click="pick(item)" ng-repeat="item in resultArray">{{item}}</div>' +
            '   </div>' +
            '</div>',
        link: function ($scope, element) {

            $scope.myInput = ''; //input field
            $scope.createDS = false; //boolean that says when to create ds

            // functions defined

            //fill the input with most relevant item on tab press

            $scope.autoFill = function (e) {
                if ($scope.myInput !== '' && e.which === 9 && $scope.resultArray.length>0) {
                    e.preventDefault();
                    $scope.myInput = $scope.resultArray[0];
                    $scope.createDS = false;
                }
            };

            // generate ds on arrow click, set focus on input field

            $scope.dsGenerator = function () {
                $scope.highlightInput = true;
                $scope.resultArray = angular.copy($scope.sourceArray);
                document.getElementById("dropDownInput").focus();
            };

            // pick item by clicking on it in dropdown

            $scope.pick = function (item) {
                $scope.myInput = item;
                $scope.highlightInput = false;
                $scope.createDS = false;
            };

            // allow ds to be created when input is focused
            $scope.showDS = function () {
                $scope.createDS = true;
                if ($scope.myInput !== '') {
                    document.getElementById("dropDownInput").select();
                }
            };

            // empty ds, used on click outside
            $scope.emptyDS = function () {
                $scope.$apply(function(){
                    $scope.resultArray = [];
                    $scope.highlightInput = false;
                });
            };

            //jquery listener on click outside

            $(document).on('click', function (event) {
               if (event.target) {
                   if (event.target.id) {
                       if(event.target.id === 'dropDownInput' || 'dopDownResult' || 'dropDownArrow' || 'dropDownArrow') {
                           $scope.showDS();
                       } else {
                           $scope.emptyDS();
                       }
                   } else {
                       $scope.emptyDS();
                   }
               }
            });

            // watch on writing in input, ds changes in accordance with it

            $scope.$watch(function () {
                return $scope.myInput;
            },function (country) {
                console.log(country, 'something is happening');
                $scope.resultArray = [];
                if ($scope.createDS && $scope.myInput !== '') {
                    if (country) {
                        for (let i = 0; i<$scope.sourceArray.length;i++) {
                            if ($scope.sourceArray[i].toUpperCase().indexOf($scope.myInput.toUpperCase()) > -1) {
                                $scope.resultArray.push($scope.sourceArray[i]);
                            }
                        }
                    } else {
                        $scope.resultArray = angular.copy($scope.sourceArray);
                    }
                } else {
                    $scope.resultArray = [];
                }
            });
        }
    };
});