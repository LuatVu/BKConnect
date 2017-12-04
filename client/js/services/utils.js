'use strict';
angular
    .module('service.utils', [])
    .factory('$mUtils', ['$http', '$rootScope', '$mLocalStorage', function ($http, $rootScope, $mLocalStorage) {
        var service = {};
        var accessToken;
        var buildQueryLink = function (relativeUrl) {
            accessToken = $rootScope.currentUser.token;
            if (accessToken == null) {
                let userInfo = $mStorage.getItem("userInfo");
                $rootScope.accessToken = userInfo.token;
                accessToken = $rootScope.accessToken;
            }
            return BASE_URL + relativeUrl + "?access_token=" + accessToken;
        }

        service.follow = function (idcompany, idstudent, callback) {
            $http.post(BASE_URL + 'follows', { idcompany: idcompany, idstudent: idstudent }).then(function (res) {
                callback(res);
            }).catch(function (res) {
                callback(res);
            })
        }

        service.unFollow = function (idcompany, idstudent, callback) {
            let url = buildQueryLink('students/' + idstudent + '/company/rel/' + idcompany);            
            $http.delete(url).then(function (res) {
                callback(res);
            }).catch(function (res) {
                callback(res);
            })
        }
        service.checkFollow = function (idcompany, idstudent, callback) {
            let url = buildQueryLink('students/' + idstudent + '/company/rel/' + idcompany);
            $http.head(url).then(function (res) {
                callback(res);
            }, function (res) {
                callback(res);
            })
        }
        return service;
    }]);