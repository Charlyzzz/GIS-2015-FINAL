/**
 * Created by Erwin on 19/11/2015.
 */
var gisController = app.controller('gisController', function ($log, $scope, gisService) {


    gisService.edts().then(function (response) {
        $scope.edts = response.data;
    });

    $scope.id = 2;

    $scope.getClosestEdt = function (lat, lng) {
        gisService.closest_edt(lat, lng).then(function (response) {
            $scope.closest_edt = response.data;

            $scope.edtMarker.coords.longitude = $scope.closest_edt.ubicacion.coordinates[0];
            $scope.edtMarker.coords.latitude = $scope.closest_edt.ubicacion.coordinates[1];

            $scope.markers = [$scope.edtMarker, $scope.mainMarker];


        });

    };

    $scope.map = {center: {latitude: -34.599722, longitude: -58.381944}, zoom: 12, bounds: {}};
    $scope.options = {};

    $scope.edtMarker = {
        id: 1,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        coords: {
            latitude: -34.599722,
            longitude: -58.381944
        },
        options: {draggable: false}
    };

    $scope.mainMarker = {
        id: 0,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        coords: {
            latitude: -34.599722,
            longitude: -58.381944
        },
        options: {draggable: true},
        events: {
            dragend: function (marker, eventName, args) {

                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();


            }
        }
    };


    $scope.markers = [$scope.mainMarker];

    $log.log($scope.markers);


});