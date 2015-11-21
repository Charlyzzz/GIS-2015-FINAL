/**
 * Created by Erwin on 19/11/2015.
 */
var gisController = app.controller('gisController', function ($scope, gisService, uiGmapGoogleMapApi) {


    $scope.bearing = 0;
    $scope.distance = 0;
    $scope.hideProgress = true;
    $scope.progressClass = "progress-bar progress-bar-success progress-bar-striped ";
    $scope.getClosestEdt = function (lat, lng) {

        gisService.closest_edt(lat, lng).then(function (response) {
            $scope.closest_edt = response.data;

            var edtCoords = {
                latitude: $scope.closest_edt.ubicacion.coordinates[1],
                longitude: $scope.closest_edt.ubicacion.coordinates[0]
            };

            var mainCoords = {
                latitude: $scope.mainMarker.coords.latitude,
                longitude: $scope.mainMarker.coords.longitude
            };

            $scope.edtMarker.coords = edtCoords;


            $scope.markers = [$scope.edtMarker, $scope.mainMarker];
            $scope.ortodromica.path = [edtCoords, mainCoords];
            $scope.ortodromica.visible = true;


            var northeast = {latitude: 0, longitude: 0};
            var southwest = {latitude: 0, longitude: 0};

            if (mainCoords.latitude < edtCoords.latitude) {
                northeast.latitude = mainCoords.latitude;
                southwest.latitude = edtCoords.latitude;
            } else {
                northeast.latitude = edtCoords.latitude;
                southwest.latitude = mainCoords.latitude;
            }

            if (mainCoords.longitude < edtCoords.longitude) {
                southwest.longitude = mainCoords.longitude;
                northeast.longitude = edtCoords.longitude;
            } else {
                southwest.longitude = edtCoords.longitude;
                northeast.longitude = mainCoords.longitude;
            }


            $scope.map.bounds = {northeast: northeast, southwest: southwest};

            $scope.distance = $scope.getDistance();

            if ($scope.distance < 10000) {
                $scope.progressClass = "progress-bar progress-bar-success progress-bar-striped ";


            }
            if ($scope.distance >= 10000 && $scope.distance < 25000) {
                $scope.progressClass = "progress-bar progress-bar-warning progress-bar-striped ";
            }

            if ($scope.distance >= 25000) {
                $scope.progressClass = "progress-bar progress-bar-danger progress-bar-striped ";
            }

            $scope.hideProgress = false;
            $scope.bearing = $scope.getBearing();
        });
    };


    $scope.map = {
        center: {
            latitude: -34.599722,
            longitude: -58.381944
        }, zoom: 12, bounds: {}, options: {}
    };

    uiGmapGoogleMapApi.then(function () {
        $scope.ortodromica = {
            id: 1,
            path: [

                {
                    latitude: 0,
                    longitude: 0
                },
                {
                    latitude: 0,
                    longitude: 0
                },

            ],
            stroke: {
                color: '#6060FB',
                weight: 4
            },
            editable: false,
            draggable: false,
            geodesic: false,
            visible: false,
            icons: [{
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                },
                offset: '8px',
                repeat: '0px'
            }]
        };

        $scope.edtMarker = {
            id: 2,
            icon: 'http://i.imgur.com/ZTVPC0u.png',
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
            options: {draggable: true}

        };


        $scope.markers = [$scope.mainMarker];
        $scope.markerEvents = {

            dragstart: function (marker, eventName, args) {

                $scope.ortodromica.visible = false;

            },
            dragend: function (marker, eventName, args) {

                $scope.getClosestEdt($scope.mainMarker.coords.latitude, $scope.mainMarker.coords.longitude);

            }
        };
    });

    $scope.getDistance = function () {
        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }


        var lat1 = $scope.edtMarker.coords.latitude;
        var lat2 = $scope.mainMarker.coords.latitude;
        var lon1 = $scope.edtMarker.coords.longitude;
        var lon2 = $scope.mainMarker.coords.longitude;

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000; // Distance in km
        return Math.floor(d);
    };

    $scope.getBearing = function () {

        if (Number.prototype.toRadians === undefined) {
            Number.prototype.toRadians = function () {
                return this * Math.PI / 180;
            };
        }


        if (Number.prototype.toDegrees === undefined) {
            Number.prototype.toDegrees = function () {
                return this * 180 / Math.PI;
            };
        }

        function LatLon(lat, lon) {
            // allow instantiation without 'new'
            if (!(this instanceof LatLon)) return new LatLon(lat, lon);

            this.lat = Number(lat);
            this.lon = Number(lon);
        }

        LatLon.prototype.bearingTo = function (point) {
            if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

            var φ1 = this.lat.toRadians(), φ2 = point.lat.toRadians();
            var Δλ = (point.lon - this.lon).toRadians();

            // see http://mathforum.org/library/drmath/view/55417.html
            var y = Math.sin(Δλ) * Math.cos(φ2);
            var x = Math.cos(φ1) * Math.sin(φ2) -
                Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
            var θ = Math.atan2(y, x);

            return (θ.toDegrees() + 360) % 360;
        };


        return LatLon($scope.mainMarker.coords.latitude, $scope.mainMarker.coords.longitude)
            .bearingTo(LatLon($scope.edtMarker.coords.latitude, $scope.edtMarker.coords.longitude));


    }

});