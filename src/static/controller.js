/**
 * Created by Erwin on 19/11/2015.
 */
var gisController = app.controller('gisController', function ($scope, gisService) {


    gisService.edts().then(function (response) {
        $scope.edts = response.data;
    });

    $scope.getClosestEdt = function (lat, lng) {
        gisService.closest_edt(lat, lng).then(function (response) {
            $scope.closest_edt = response.data;
            $scope.marker2.coords.longitude = $scope.closest_edt.ubicacion.coordinates[0];
            $scope.marker2.coords.latitude = $scope.closest_edt.ubicacion.coordinates[1]
        });

    };

    $scope.marker2 = {
        id: 1,
        coords: {
            latitude: -34.599722,
            longitude: -58.381944
        },
        options: {draggable: true}
    };


    $scope.map = {center: {latitude: -34.599722, longitude: -58.381944}, zoom: 12};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
        id: 0,
        coords: {
            latitude: -34.599722,
            longitude: -58.381944
        },
        options: {draggable: true},
        events: {
            dragend: function (marker, eventName, args) {

                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();


                $scope.marker.options = {
                    draggable: true,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };


});