window.DatVeController = function ($scope, $http, $location) {
     document.title = 'Đặt vé';
     const apiConection = "https://651d363044e393af2d595ffa.mockapi.io/hungnv/"
     const apiConection2 = "https://651d363044e393af2d595ffa.mockapi.io/hungnv/thongTin/"
     console.log("ok");
     $http.get(apiConection + "assgiment").then(function (reponse) {
          $scope.address = reponse.data;
     })
     $http.get(apiConection2).then(function (reponse) {
          $scope.listVe = reponse.data;
     })
     $scope.submitVe = function () {
          $scope.checkNull = {
               fullName: false,
               CCCD: false,
               veID: false,
               gtinh: false,
               gender: false,
               phoneNum: false
          }
          let flag= true;
          $scope.check = {
               fullName: false,
               CCCD: false,
               veID: false,
               gtinh: false,
               gender: false,
               phoneNum: false
          }
          //check giới tính
          if (($scope.gtinh_nam == $scope.gtinh_nu && !$scope.gtinh_nam )) {
               console.log($scope.gtinh_nam );
               $scope.checkNull.gender=true;  
               flag=false;           
          }
          else if($scope.gtinh_nam == $scope.gtinh_nu ){
               $scope.check.gender=true; 
               flag=false; 
          }
          //check tên
          if (!$scope.thongTin || !$scope.thongTin.fullName) {               
               $scope.checkNull.fullName = true;
               flag=false; 
          }
          //check cccd
          if (!$scope.thongTin || !$scope.thongTin.CCCD) {
               flag=false;
               $scope.checkNull.CCCD = true;
          } else if (isNaN($scope.thongTin.CCCD)) {             
               $scope.check.CCCD = true;
               flag=false; 
          }
          //check chuyến bay
          if (!$scope.thongTin || !$scope.chuyenBay) {
               flag = false
               $scope.checkNull.veID = true;
          }
          //check số điện thoiaj
          const phoneNumberRegex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;

          if (!$scope.thongTin || !$scope.thongTin.phoneNum) {
              
               $scope.checkNull.phoneNum = true;
               flag=false; 
          } else {
               if (!phoneNumberRegex.test($scope.thongTin.phoneNum)) {
                    flag = false
                    $scope.check.phoneNum = true;
               }
          }
          //check email
          const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

          if (!$scope.thongTin || !$scope.thongTin.email) {
               flag = false
               $scope.checkNull.email = true;
          }
          else if (!emailRegex.test($scope.thongTin.email)) {
               flag = false
               $scope.check.email = true;
          }

          console.log($scope.chuyenBay);

          if (flag) {
               let newVe = {
                    fullName: $scope.thongTin.fullName,
                    CCCD: $scope.thongTin.CCCD,
                    veID: $scope.chuyenBay,
                    gender: $scope.gtinh_nam ? "Nam" : "Nữ",
                    phoneNum: $scope.thongTin.phoneNum,
                    email: $scope.thongTin.email,
               }
               //console.log(newVe);

               $http.post(apiConection + "thongTin", newVe).then(function (response) {
                    alert("Đặt thành công")
                    // Tải lại trang hiện tại
                    window.location.reload();

               })
          }

     }
     $scope.deleteVe = function (id) {
          let confirm = window.confirm("Bạn có chắc là xoá hay không?");
          if (confirm) {
               $http.delete(apiConection2 + id).then(function (response) {
                    if (response.status == 200) {
                         alert("Xoá thành công");
                         window.location.reload();
                    }
               })
          }
     }
}