$(document).ready(function () {
    var nguoiDungService = new NguoiDungService();

    layDanhSachNguoiDung();


    function getInput(title, btnTitle, btnID) {
        $(".modal-title").html(title);
        var footer =
            `
        <button id="${btnID}" class="btn btn-primary">${btnTitle}</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `

        $(".modal-footer").html(footer);
    }

    $("#btnThemNguoiDung").click(function () {
        getInput("Thêm người dùng","Thêm", "btnThem");
    })

    //thử git
    //DOM tới để lấy data
    //b2: copy "data-taikhoan="${item.TaiKhoan}"" lên nút Sửa trong hàm taoBang
    $("body").delegate("#btnSua", "click", function () {
        getInput("Sửa người dùng","Cập nhật", "btnCapNhat");


        //b3: lấy tài lhoản
        var taiKhoan = $(this).data('taikhoan');

        var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);
        console.log(nguoiDung);
        
        //DOM tới các field data
        $("#TaiKhoan").val(taiKhoan);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#LoaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    })

    

    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#LoaiNguoiDung").val();
        var nguoiDung = new NguoiDung (taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);

        nguoiDungService.themNguoiDung(nguoiDung);
    })

    $("body").delegate("#btnXoa", "click", function(){
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);
    })

    $("#txtTimKiem").keyup(function(){
        //tạo mảng để hứng kết quả tar3 về
        var mangTimKiem = [];
        var timKiem = $("#txtTimKiem").val();
        mangTimKiem = nguoiDungService.timKiemNguoiDung(timKiem);
        taoBang(mangTimKiem);

    })

    function layDanhSachNguoiDung() {
        nguoiDungService.layDanhSachNguoiDung()
            .done(function (result) {
                taoBang(result);
                localStorage.setItem("DSND", JSON.stringify(result));
            })
            .fail(function (err) {
                console.log(err);
            })
    }


    function taoBang(danhSachNguoiDung) {
        var tblBody = "";

        //hàm map dùng thay thế vòng for vì ngắn gọn hơn
        //hàm map có 2 tham số: item là object, index là i
        danhSachNguoiDung.map(function (item, index) {
            tblBody +=
                `
        <tr>
            <td>${index + 1}</td>
            <td>${item.TaiKhoan}</td>
            <td>${item.MatKhau}</td>
            <td>${item.HoTen}</td>
            <td>${item.Email}</td>
            <td>${item.SoDT}</td>
            <td>${item.TenLoaiNguoiDung}</td>
            <td>
                <button id="btnSua" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-taikhoan="${item.TaiKhoan}" >Sửa</button>
                <button id="btnXoa" class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xoá</button>
            </td>
        </tr>
        `
        })
        $("#tblDanhSachNguoiDung").html(tblBody);
    }
})