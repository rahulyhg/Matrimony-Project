ungdungAngularjs.controller("sinhvienController", function($scope) {
   $scope.sinhvien = {
      ho: "Tran Minh",
      ten: "Chinh",
      hocphi:200,
      tenMonHoc:[
         {ten:'Vat Ly Dai Cuong',diemthi:8.5},
         {ten:'Triet Hoc',diemthi:7.5},
         {ten:'Toan',diemthi:9.0},
         {ten:'Tieng Anh',diemthi:8.0},
         {ten:'Kinh Te',diemthi:9.5}
      ],
      hoten: function() {
         var doituongsinhvien;
         doituongsinhvien = $scope.sinhvien;
         return doituongsinhvien.ho + " " + doituongsinhvien.ten;
      }
   };
});
