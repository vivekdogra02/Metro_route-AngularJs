(function(app) {
    //
    //
    // var testData = [{
    //     id: 1,
    //     airline: "USA",
    //     flightNumber: 23,
    //     startTime: "13:00",
    //     endTime: "15:00",
    //     totalDuration: 2,
    //     price: 500,
    //     date: "13/05/2016",
    //     cities: ["OtD", "NY"]
    // }, {
    //     id: 2,
    //     airline: "Uk",
    //     flightNumber: 34,
    //     startTime: "13:00",
    //     endTime: "15:00",
    //     totalDuration: 7,
    //     date: "12/05/2016",
    //     cities: ["ORD", "LAS"],
    //     price: 100
    // }];


    var flightService = function($http,$scope) {
        var flightFactory = {};

        // flightFactory.getFlights = function() {
        //     return testData;
        // };

        flightFactory.getMetroRoute = function()
        {
          return  $http({
                method: 'GET',
                url: '/airlineApp/metro.json'
            }).success(function (data, status, headers, config) {
                   return data;
               }).error(function (data, status, headers, config) {
                   return status;
               });
        }
        flightFactory.selectFlight = function(id) {
            // $http.put ("/flight/select/3 ",id)
            return true;
        };
        return flightFactory;
    };


    app.factory('flightService',['$http', flightService]);

}(angular.module('airlineApp')));
