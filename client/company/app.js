// create the module and name it comApp
var comApp = angular.module('comApp', ['ngRoute', 'summernote', 'ngDatepicker', 'ngTagsInput', 'ngFileUpload', 'ngAnimate',
    'ui.bootstrap','datatables']);

// configure our routes
comApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        // route for the home page
        .when('/home', {
            templateUrl: 'company/views/home.html',
            controller: 'PostController'
        })
        .when('/login', {
            templateUrl: 'company/views/login.html',
            controller: 'LoginController',
            css: 'company/views/css/style.css'
        })
        .when('/post', {
            templateUrl: 'company/views/post.html',
            controller: 'PostController'

        })
        .when('/edit/:id', {
            templateUrl: 'company/views/edit.html',
            controller: 'EditPostController'

        })
        .when('/postmanagement', {
            templateUrl: 'company/views/postmanager.html',
            controller: 'ManagerPostController'

        })
        .when('/editprofile', {
            templateUrl: 'company/views/editprofile.html',
            controller: 'ProfileController'
        })
        .when('/cvmangement', {
            templateUrl: 'company/views/cvmanager.html',
            controller: 'CVManagerController'
        })
        .when('/newcv', {
            templateUrl: 'company/views/newcv.html',
            controller: 'NewCVController'
        })
        .otherwise({
            redirect: '/home',
        });

}]);

comApp.run(function ($rootScope, $location, $mLocalStorage, AuthenService) {
    $rootScope.location = $location;
    $rootScope.companyName = "HuyDZ";
    $rootScope.currentCompany = $mLocalStorage.getItem('companyInfo');
    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
        if ($rootScope.currentCompany == null) {
            if (next.templateUrl == "company/views/login.html") {
            }
            else {
                $location.path("/login");
            }
        } else {
            if (next == undefined) {
                $location.path(current.$$route.originalPath)
            } else if (next.templateUrl == "company/views/login.html") {
                $location.path("/post");
            }
        }

    });
});

comApp.controller('LogoutController', ['$scope', '$rootScope', '$mLocalStorage', '$location',
    function ($scope, $rootScope, $mLocalStorage, $location) {
        $scope.logout = function () {
            $mLocalStorage.deleteItem('companyInfo');
            $rootScope.currentCompany = null;
            $scope.user = $rootScope.currentCompany;
            $rootScope.$broadcast('loadHeader');
            $location.path("/login");
        }
    }])