function NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung){
    //do định dạng json của BE bắt buộc phải đổi lại thứ tự matKhau và email
    this.TaiKhoan = taiKhoan;
    this.MatKhau = matKhau;
    this.HoTen = hoTen;
    this.Email = email;
    this.SoDT = soDT;
    this.MaLoaiNguoiDung = loaiNguoiDung;
}