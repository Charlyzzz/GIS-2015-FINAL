/**
 * Created by Erwin on 19/11/2015.
 */
//var app = angular.module('gisApp', []).config(function (uiGmapGoogleMapApiProvider) {
//    uiGmapGoogleMapApiProvider.configure({
//        key: 'AIzaSyC8agUhPelme7iIcLiQcNJJqcY8Ke7Jg_8',
//        v: '3.20', //defaults to latest 3.X anyhow
//        libraries: 'weather,geometry,visualization'
//    });
var app = angular.module('gisApp', ['uiGmapgoogle-maps']).config(
    ['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            argentina: true
        });
    }]
);