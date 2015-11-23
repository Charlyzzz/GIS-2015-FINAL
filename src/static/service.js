/**
 * Created by Erwin on 20/11/2015.
 */

var gisService = app.service('gisService', function ($http) {


    this.closest_edt = function (latitude, longitude) {
        return $http.get('/closest_edt/' + latitude + '/' + longitude);
    };

    this.distance = function (loc1, loc2) {
        return $http.get('/distance/' + loc1.latitude + ',' + loc1.longitude + '/' + loc2.latitude + ',' + loc2.longitude);
    };

    this.edts = function (parametros) {
        return $http.get('/edts/' + parametros);
    };

    this.updateOrInsert = function (edt) {
        $http.post('/edt', edt);

    };

    this.delete = function (edt) {
        $http.post('/edt/delete', edt);

    }


});
