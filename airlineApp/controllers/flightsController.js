(function(app) {

    var flightsController = function($scope, flightService, $timeout) {

        var init = function() {
            //$scope.flights = flightService.getFlights();
            $scope.metroRoute = flightService.getMetroRoute().then(function(response) {
                // call was successful
                $scope.content = response.data;
                $scope.validColor = $scope.selectLayout();
            }, function(response) {
                // call returned an error
                $scope.content = response;
            });

        }
        $scope.selectLayout = function() {
            var layout = $scope.content;
            var line={};
            var outputColor = [];
            var layoutResponse = {
                metro: {
                    underground: [],
                    elevated: [],
                    at_grade: []
                }
            }
            for (var i = 0; i < layout.length; i++) {
                this.layout = layout[i];
                $scope.colorBox = this.layout.details.line;
                if (this.layout.details.layout.indexOf('Elevated') > -1) {
                    layoutResponse.metro.elevated.push(this.layout);
                    //layoutResponse.metro.line.push(this.layout.details.line);
                    outputColor.push($scope.colorSelection($scope.colorBox));
                      this.layout.details.line=outputColor[i];

                } else if (this.layout.details.layout.indexOf('Underground') > -1) {
                    layoutResponse.metro.underground.push(this.layout);
                    outputColor.push($scope.colorSelection($scope.colorBox));
                    this.layout.details.line=outputColor[i];

                } else {
                    layoutResponse.metro.at_grade.push(this.layout);
                    outputColor.push($scope.colorSelection($scope.colorBox));
                    this.layout.details.line=outputColor[i];
                }

            }
            line=outputColor;
            console.log(layoutResponse);
            line =  Object.setPrototypeOf(outputColor, Object.prototype);
            //console.log($scope.outputColors);
            return outputColor;

        }
        $scope.colorSelection = function(color) {
            var colorArr = [];
            //var colorObj = {};

            for (var i = 0; i < color.length; i++) {
                var cp = color[i];
                var col={};
                var colorObj = {};
                colorObj["hex"] = this.hex;

                if (cp.indexOf('Blue') > -1) {
                    //colorObj.colorArr.color=this.color;
                    colorObj.hex = "#0000ff";
                    colorObj.color = cp;
                    //colorObj.hex = this.hex;
                    colorArr.push(colorObj);
                    //colorArr.push(colorObj);
                } else if (cp.indexOf('Red') > -1) {

                    //colorObj.colorArr.color=this.color;
                    colorObj.hex = "#ff0000";
                    colorObj.color = cp;
                    //  colorObj.hex = this.hex;
                    colorArr.push(colorObj);
                    //  colorArr.push(colorObj);
                } else if (cp.indexOf('Violet') > -1) {

                    //colorObj.colorArr.color=this.color;
                    colorObj.hex = "#8000ff";
                    colorObj.color = cp;
                    //colorObj.hex = this.hex;
                    colorArr.push(colorObj);
                    //colorArr.push(colorObj);
                } else if (cp.indexOf('Green') > -1) {

                    //colorObj.colorArr.color=this.color;
                    colorObj.hex = "#00ff00";
                    colorObj.color = cp;
                    //colorObj.hex = this.hex;
                    colorArr.push(colorObj);
                    //colorArr.push(colorObj);

                } else if (cp.indexOf('Yellow') > -1) {

                    //colorObj.colorArr.color=this.color;
                    colorObj.hex = "#ffff00";
                    colorObj.color = cp;
                    //colorObj.hex = this.hex;
                    colorArr.push(colorObj);
                    //colorArr.push(colorObj);

                } else if (cp.indexOf('Airport') > -1) {

                    //colorObj.colorArr.color=this.color;
                    colorObj.hex = "#ff8000";
                    colorObj.color = cp;
                    //colorObj.hex = this.hex;
                    colorArr.push(colorObj);
                    //colorArr.push(colorObj);
                }

            }
            for (var i = 0; i < colorArr.length; i++) {
                //col['color']=colorArr[i].hex;

                col[i] = colorArr[i].hex;
            }
            return col;
        }

        $scope.setModalData = function (index){
          $scope.modalData = $scope.content[index];
          $scope.appindex=index;
          console.log($scope.modalData);
          //
          // $scope.modalAvailableOption=$scope.cartData[index]
        }
        $scope.selectFlight = function(selectMetro) {
            for (var f in $scope.metroRoute) {
                $scope.metroRoute[f].approved = false;
            }
            selectMetro.approved = !selectMetro.approved;
            if (flightService.selectFlight(selectMetro)) {
                $scope.status = "You have made a great decision !!";
                $timeout(function() {
                    $scope.status = null;
                }, 2000);
            }
        }
        init();
    };
    app.controller('flightsController', ['$scope', 'flightService', '$timeout', flightsController]);
})(angular.module('airlineApp'));
