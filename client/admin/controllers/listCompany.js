angular.module('admin').controller('ListCompanyController', ['$scope', '$state', '$rootScope', '$mAuth', '$mLocalStorage', '$mCompany',
    function ($scope, $state, $rootScope, $mAuth, $mLocalStorage, $mCompany) {

        var listCompany = [];
        var loadData = function () {
            $mCompany.getListActivated(function (res) {
                $scope.listCompany = res.companies;
                // console.log(res);
            })
        };

        $scope.blockCompany = function (company) {
            var emailCompany = company.email;
            $scope.isPaneShown = true;
            $mCompany.blockCompany(emailCompany, function (res) {
                $scope.isPaneShown = false;
                if (res.status == 204) {
                    company.block = true;
                    swal({
                        title: "Thành công!",
                        text: "Đã block công ty!",
                        icon: "success",
                    });
                } else {
                    swal({
                        title: "Thất bại!",
                        text: "Đang block công ty!",
                        icon: "error",
                    });
                }
                // console.log(res);
            })
        }
        $scope.activateCompany = function (company) {
            var emailCompany = company.email;
            $scope.isPaneShown = true;
            $mCompany.activateCompany(emailCompany, function (res) {
                $scope.isPaneShown = false;

                if (res.status == 204) {
                    company.block = false;
                    swal({
                        title: "Thành công!",
                        text: "Đã activate công ty!",
                        icon: "success",
                    });
                } else {
                    swal({
                        title: "Thất bại!",
                        text: "Công ty đang ở trạng thái activate!",
                        icon: "error",
                    });
                }
            })
        }
        
        $scope.reset = function () {
            $state.reload();
        }
        loadData();
    }])
   