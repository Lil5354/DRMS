# Hướng Dẫn Demo DRMS - Cuộc Thi

## 🎯 Luồng Demo Hoàn Chỉnh

### 1. Đăng ký Quyên Góp (Nhà Hảo Tâm)
**Bước 1:** Đăng nhập với tài khoản DONOR
- Email: `donor@gmail.com` (hoặc đăng ký tài khoản mới)

**Bước 2:** Chọn điểm tập kết
- Vào trang `/drms/donor`
- Click "Tôi muốn ủng hộ" hoặc chọn điểm tập kết trên bản đồ
- Click "Đăng ký gửi hàng"

**Bước 3:** Điền form quyên góp
- Điền thông tin người quyên góp
- Thêm vật phẩm (Gạo, Nước uống, Mì tôm, etc.)
- Chọn phương thức giao hàng
- Click "Đăng ký quyên góp"

**Kết quả:**
- ✅ Hiển thị thông báo thành công với mã tracking (VD: TRK863618)
- ✅ Lưu vào localStorage với ngày **1/1/2026**
- ✅ Tự động chuyển về trang donor

---

### 2. Quản Lý Kho (Warehouse Manager)
**Bước 1:** Đăng nhập với tài khoản WAREHOUSE_MANAGER
- Email: `manager1@drms.vn` (hoặc tài khoản có role WAREHOUSE_MANAGER)

**Bước 2:** Xem danh sách chờ nhập kho
- Vào trang `/drms/warehouse`
- Tab "Nhập kho" → Xem danh sách lô hàng chờ nhận
- **Lô hàng vừa đăng ký sẽ xuất hiện ở đây với ngày 1/1/2026**

**Bước 3:** Xác nhận nhận hàng
- Click vào lô hàng để xem chi tiết
- Hoặc click nút "Xác nhận nhận hàng" trực tiếp
- ✅ Trạng thái tự động chuyển từ "Chờ nhận" → "Đã nhận"
- ✅ Lô hàng chuyển sang tab "Tồn kho"

**Kết quả:**
- ✅ Lô hàng được cập nhật trong localStorage
- ✅ Hiển thị trong tab "Tồn kho" với trạng thái "Đã nhập kho"
- ✅ Thời gian nhận: **1/1/2026**

---

### 3. Quản Trị Viên (Admin)
**Bước 1:** Đăng nhập với tài khoản ADMIN
- Email: `admin@drms.vn`

**Bước 2:** Xem tổng quan
- Vào trang `/drms/admin`
- Tab "Quyên góp" → Xem tất cả lô hàng
- Có thể xem chi tiết, cập nhật trạng thái, xóa lô hàng

**Kết quả:**
- ✅ Thấy tất cả lô hàng từ localStorage và mock data
- ✅ Có thể quản lý toàn bộ hệ thống

---

## 🔄 Luồng Hoạt Động Tự Động

### Tính Năng Đã Tích Hợp:
1. **localStorage Integration:**
   - Donations được lưu vào localStorage khi đăng ký
   - WarehouseManager và AdminDashboard tự động đọc từ localStorage
   - Cập nhật trạng thái được lưu vào localStorage

2. **Ngày Tháng:**
   - Tất cả donations mới có ngày **1/1/2026**
   - Mock data đã được cập nhật với ngày 1/1/2026

3. **Tracking Code:**
   - Tự động tạo mã tracking khi đăng ký (VD: TRK863618)
   - Hiển thị trong danh sách chờ nhập kho
   - Có thể tra cứu bằng mã tracking

---

## 📝 Điểm Trình Bày Quan Trọng

### 1. **Tính Liền Mạch:**
- ✅ Đăng ký quyên góp → Tự động xuất hiện trong danh sách chờ nhập kho
- ✅ Xác nhận nhận hàng → Tự động chuyển sang tồn kho
- ✅ Không cần refresh trang, mọi thứ tự động cập nhật

### 2. **Thời Gian:**
- ✅ Tất cả hiển thị ngày **1/1/2026** (phù hợp với cuộc thi)
- ✅ Thời gian đăng ký, nhận hàng đều là 1/1/2026

### 3. **Tracking Code:**
- ✅ Mỗi lô hàng có mã tracking duy nhất
- ✅ Có thể tra cứu, quét QR (UI đã có, chưa implement backend)

---

## 🎬 Script Trình Bày

### Phần 1: Giới Thiệu Hệ Thống (2 phút)
- "Đây là hệ thống DRMS - Quản lý cứu trợ thiên tai"
- "Hệ thống cho phép nhà hảo tâm đăng ký quyên góp, quản lý kho, và phân phối hàng cứu trợ"

### Phần 2: Demo Đăng Ký Quyên Góp (3 phút)
1. Đăng nhập với tài khoản DONOR
2. Chọn điểm tập kết trên bản đồ
3. Điền form quyên góp
4. **Highlight:** "Sau khi đăng ký, hệ thống tự động tạo mã tracking và lưu vào hệ thống"

### Phần 3: Demo Quản Lý Kho (3 phút)
1. Đăng nhập với tài khoản WAREHOUSE_MANAGER
2. Vào tab "Nhập kho"
3. **Highlight:** "Lô hàng vừa đăng ký đã xuất hiện ở đây với ngày 1/1/2026"
4. Xác nhận nhận hàng
5. **Highlight:** "Lô hàng tự động chuyển sang tab Tồn kho với trạng thái Đã nhận"

### Phần 4: Demo Quản Trị (2 phút)
1. Đăng nhập với tài khoản ADMIN
2. Xem tổng quan toàn hệ thống
3. **Highlight:** "Admin có thể xem và quản lý tất cả lô hàng trong hệ thống"

---

## ⚠️ Lưu Ý Khi Demo

1. **Không refresh trang** - Mọi thứ tự động cập nhật qua localStorage
2. **Sử dụng cùng trình duyệt** - localStorage chỉ hoạt động trong cùng trình duyệt
3. **Nếu cần reset:** Xóa localStorage bằng cách mở DevTools → Application → Local Storage → Clear

---

## 🚀 Cách Khởi Chạy

```bash
npm run dev
```

Truy cập: http://localhost:5173

---

## 📧 Tài Khoản Demo

- **DONOR:** 
  - Email: `donor@gmail.com`
  - Hoặc đăng ký tài khoản mới

- **WAREHOUSE_MANAGER:**
  - Email: `manager1@drms.vn`
  - Password: (bất kỳ - mock login)

- **ADMIN:**
  - Email: `admin@drms.vn`
  - Password: (bất kỳ - mock login)

---

Chúc bạn trình bày thành công! 🎉

