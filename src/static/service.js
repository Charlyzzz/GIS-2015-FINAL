/**
 * Created by Erwin on 20/11/2015.
 */

var gisService = app.service('gisService', function ($http) {

    this.edts = function () {
        return $http.get('/edts')
    };

    this.closest_edt = function (latitude, longitude) {
        return $http.get('/closest_edt/' + latitude + '/' + longitude)
    }
});