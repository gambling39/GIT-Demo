function NguoiDungService() {

    this.layDanhSachNguoiDung = function () {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
    //b1:         .done(function (result) {
    //             //taoBang(result);
    //         })
    //         .fail(function (err) {
    //             console.log(err);
    //         })
    // }
    }

    this.themNguoiDung = function(nguoiDung){
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
        .done(function(result){
            if(result === "tai khoan da ton tai !"){
                alert(result);
            } else{
                location.href = "";
                //truyền null thì tự load lại trang hiện tại
                //location.href="/link";
            }
        })
        .fail(function(err){
            console.log(err);
        })
    }

    this.layViTriNguoiDung = function (taiKhoan){

        var danhSachNguoiDung = JSON.parse(localStorage.getItem("danhSachNguoiDung"));

        //phục vụ chức năng tìm vị trí
        return danhSachNguoiDung.findIndex(function(item){
            return item.TaiKhoan === taiKhoan;
        })

    }
    //thử git

    this.layThongTinNguoiDung = function (taiKhoan){
        var danhSachNguoiDung = JSON.parse(localStorage.getItem("danhSachNguoiDung"));
        return danhSachNguoiDung.find(function(item){
            return item.TaiKhoan === taiKhoan;
        })
    }

    this.xoaNguoiDung = function(taiKhoan){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
        .done(function(result){
            location.reload();
        })
        .fail(function(err){
            console.log(err);
        })
    }

    this.timKiemNguoiDung = function(chuoiTimKiem){
        var dsnd = JSON.parse(localStorage.getItem("DSND"));
        var mangTimKiem = [];

        dsnd.map(function(item){
            if(item.TaiKhoan.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1 ){
                mangTimKiem.push(item);
            }
        })
        return mangTimKiem;
    }

//b2: function taoBang(danhSachNguoiDung) {
//     var tblBody = "";

//     //hàm map dùng thay thế vòng for vì ngắn gọn hơn
//     //hàm map có 2 tham số: item là object, index là i
//     danhSachNguoiDung.map(function (item, index) {
//         tblBody +=
//         `
//         <tr>
//             <td>${index + 1}</td>
//             <td>${item.TaiKhoan}</td>
//             <td>${item.MatKhau}</td>
//             <td>${item.HoTen}</td>
//             <td>${item.Email}</td>
//             <td>${item.SoDT}</td>
//             <td>${item.TenLoaiNguoiDung}</td>
//             <td>
//                 <button id="btnSua" class="btn btn-success">Sửa</button>
//                 <button id="btnXoa" class="btn btn-danger">Sửa</button>
//             </td>
//         </tr>
//         `
//     })

    // for(var i=0; i < danhSachNguoiDung.length; i++){
    //     tblBody += 
    //     `
    //     <tr>
    //         <td>${i+1}</td>
    //         <td>${danhSachNguoiDung[i].TaiKhoan}</td>
    //         <td>${danhSachNguoiDung[i].MatKhau}</td>
    //         <td>${danhSachNguoiDung[i].HoTen}</td>
    //         <td>${danhSachNguoiDung[i].Email}</td>
    //         <td>${danhSachNguoiDung[i].SoDT}</td>
    //         <td>${danhSachNguoiDung[i].TenLoaiNguoiDung}</td>
    //     </tr>
    //     `
    // }
    //$("#tblDanhSachNguoiDung").html(tblBody);
}