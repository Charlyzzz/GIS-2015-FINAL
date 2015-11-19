<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Marker Labels</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        #map {
            height: 100%;
        }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8agUhPelme7iIcLiQcNJJqcY8Ke7Jg_8&signed_in=true"></script>
    <script>
        // In the following example, markers appear when the user clicks on the map.
        // Each marker is labeled with a single alphabetical character.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;
        var marker;

        function initialize() {
            var bangalore = {lat: 12.97, lng: 77.59};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: bangalore
            });

            // This event listener calls addMarker() when the map is clicked.
            google.maps.event.addListener(map, 'click', function (event) {
                addMarker(event.latLng, map);
            });

            // Add a marker at the center of the map.
            addMarker(bangalore, map);
        }

        // Adds a marker to the map.
        function addMarker(location, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            if (marker == null) {
                marker = new google.maps.Marker({
                    position: location,
                    label: "X",
                    map: map
                });
            } else {
                marker.setPosition(location);
            }
        }

        google.maps.event.addDomListener(window, 'load', initialize);

    </script>
</head>
<body>
<div id="map"></div>
</body>
</html>