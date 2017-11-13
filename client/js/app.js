// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'service.auth',
    'service.localStorage',
    'service.student',
    'service.company',
    'service.admin'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider,
    $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);
    $stateProvider
      //anonymous 
      .state('home', {
        title: 'Trang chủ Website',
        url: '/home',
        templateUrl: 'views/home/index.html',
        controller: 'LoginController'
      })

      //student
      .state('login', {
        title: 'Đăng nhập & Đăng ký',
        url: '/login',
        templateUrl: 'views/student/login.html',
        controller: 'LoginController'
      })
      .state('profile', {
        title: 'Profile Student',
        url: '/student/profile',
        templateUrl: 'views/student/profile.html',
        controller: 'ProfileController'
      })
      .state('verified', {
        title: 'Kích hoạt thành công',
        url: '/verified',
        templateUrl: 'views/student/verified.html',
        controller: 'LoginController'
      })

      //Company
      // .state('loginCompany', {
      //   title: 'Đăng nhập tài khoản công ty',
      //   url: '/company',
      //   templateUrl: 'views/company/login.html',
      //   controller: 'LoginController'
      // })
      
      .state('homeCompany', {
        title: 'Trang chủ công ty ',
        url: '/companies/:id',
        templateUrl: 'views/company/index.html',
        controller: 'HomeCompanyController'
      })

      // .state('admincompany', {
      //   title: 'Quản trị công ty ',
      //   url: '/company/admin',
      //   templateUrl: 'views/companytest/admin.html',
      //   controller: 'AdminCompanyController'
      // })


      //Admin
      .state('loginAdmin', {
        title: 'Đăng nhập tài khoản admin',
        url: '/admin',
        templateUrl: 'views/admin/login.html',
        controller: 'LoginController'
      })
      .state('request', {
        title: 'Trang chủ Admin ',
        url: '/admin/home',
        templateUrl: 'views/admin/home.html',
        controller: 'RequestController'
      })
      .state('admin', {
        title: 'Trang chủ Admin ',
        url: '/admin/company',
        templateUrl: 'views/admin/company.html',
        controller: 'ListCompanyController'
      })
      ;

    $urlRouterProvider.otherwise('home');

    // $('#test').addClass('hide');
    // $('#test').removeClass('hide');
  }])
  .run(["$rootScope", '$state', '$mAuth', '$mLocalStorage',
    function ($rootScope, $state, $mAuth, $mLocalStorage) {
      //get currentUser
      $rootScope.currentUser = $mLocalStorage.getItem('userInfo');
      $rootScope.currentCompany = $mLocalStorage.getItem('companyInfo');
      $rootScope.currentAdmin = $mLocalStorage.getItem('adminInfo');

    }]);

