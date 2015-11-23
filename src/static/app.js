/**
 * Created by Erwin on 19/11/2015.
 */

var app = angular.module('gisApp', ['uiGmapgoogle-maps', 'ui.bootstrap']).config([
    'uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            argentina: true,
            key: 'AIzaSyC8agUhPelme7iIcLiQcNJJqcY8Ke7Jg_8',
            libraries: 'geometry,visualization'
        });
    }]
);