
let myApp = angular.module("myApp", ['ngRoute']);//ngRoute cung cấp các tính năng định tuyến để quản lý việc điều hướng.
    myApp.config( function ($routeProvider, $locationProvider) 
        {
        $routeProvider
        .when('/trang_chu', { templateUrl: 'views/TrangChu.html', controller: TrangChuController })
        .when('/lien_he', { templateUrl: 'views/LienHe.html', controller: LienHeController })
        .when('/dat_ve', { templateUrl: 'views/DatVe.html', controller: DatVeController })
        .when('/updateVe/:id', { templateUrl: 'views/DatVe.html', controller: UpdateVeController })
        .otherwise({
            redirectTo: '/trang_chu'
        })
    
        // $routeProvider.when(tên router, 1 oject{đường dẫn đến view, tên controller cần map tới})
    });
