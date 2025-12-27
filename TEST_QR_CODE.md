# Hướng Dẫn Test QR Code Feature

## 🚀 Bước 1: Khởi động Backend Server

1. Mở terminal và chuyển đến thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies (nếu chưa cài):
```bash
npm install
```

3. Khởi động server:
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3001`

**Kiểm tra server đang chạy:**
- Mở trình duyệt và truy cập: `http://localhost:3001/health`
- Bạn sẽ thấy: `{"status":"OK","message":"DRMS Backend Server is running",...}`

## 🎨 Bước 2: Khởi động Frontend

1. Mở terminal mới và chuyển đến thư mục gốc:
```bash
cd ..
```

2. Khởi động frontend (nếu chưa chạy):
```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu 5173 đã được sử dụng)

## ✅ Bước 3: Test Các Tính Năng

### Test 1: Tạo QR Code sau khi đăng ký quyên góp

1. **Đăng nhập** với tài khoản DONOR:
   - Email: `donor@gmail.com`
   - Hoặc đăng ký tài khoản mới

2. **Vào trang đăng ký quyên góp:**
   - Click "Tôi muốn ủng hộ" hoặc chọn điểm tập kết
   - Click "Đăng ký gửi hàng"

3. **Điền form và submit:**
   - Điền thông tin người quyên góp
   - Thêm vật phẩm (ví dụ: Gạo 100kg)
   - Click "Đăng ký quyên góp"

4. **Kiểm tra QR Code:**
   - ✅ Dialog hiển thị với tiêu đề "Đăng ký thành công!"
   - ✅ Mã tracking được hiển thị (ví dụ: TRK863618)
   - ✅ QR Code được hiển thị với kích thước 250x250
   - ✅ Có nút "Tải xuống" để download QR code
   - ✅ Có thể đóng dialog và quay về trang chủ

### Test 2: Xem QR Code trong Warehouse Manager

1. **Đăng nhập** với tài khoản WAREHOUSE_MANAGER:
   - Email: `manager1@drms.vn`

2. **Vào trang Warehouse Manager:**
   - URL: `/drms/warehouse`

3. **Xem QR Code của một lô hàng:**
   - Vào tab "Nhập kho" hoặc "Tồn kho"
   - Click vào một lô hàng để xem chi tiết
   - ✅ Trong dialog chi tiết, cuối cùng sẽ có section "Mã QR Tracking"
   - ✅ QR Code được hiển thị với kích thước 200x200
   - ✅ Có nút "Tải xuống" để download

4. **Hoặc click nút "Xem QR":**
   - Trong danh sách lô hàng, click nút "Xem QR"
   - ✅ Dialog mở ra với QR code

### Test 3: Quét QR Code để tìm lô hàng

1. **Vào tab "Quét QR":**
   - Trong Warehouse Manager, click tab "Quét QR"

2. **Quét QR Code:**
   - Cho phép truy cập camera
   - Quét QR code đã tạo từ Test 1
   - ✅ Hệ thống tự động tìm thấy lô hàng
   - ✅ Dialog chi tiết tự động mở ra
   - ✅ Toast notification hiển thị "Tìm thấy lô hàng: TRK..."

3. **Nhập mã thủ công:**
   - Nhập mã tracking vào ô input (ví dụ: TRK001235)
   - Click nút "Tìm" hoặc nhấn Enter
   - ✅ Hệ thống tìm thấy và hiển thị chi tiết lô hàng

### Test 4: Test API trực tiếp

1. **Test Health Check:**
```bash
curl http://localhost:3001/health
```

2. **Test Generate QR Code (PNG):**
```bash
curl http://localhost:3001/api/qr/TRK001235?size=300 -o qr-test.png
```
Mở file `qr-test.png` để xem QR code

3. **Test Generate QR Code (SVG):**
```bash
curl http://localhost:3001/api/qr/TRK001235?format=svg&size=400 -o qr-test.svg
```

4. **Test Get Data URL:**
```bash
curl http://localhost:3001/api/qr/TRK001235/data
```
Response sẽ trả về JSON với `dataUrl` (base64)

5. **Test Batch Generation:**
```bash
curl -X POST http://localhost:3001/api/qr/batch \
  -H "Content-Type: application/json" \
  -d '{"trackingIds":["TRK001235","TRK001236"],"size":300}'
```

## 🐛 Xử Lý Lỗi

### Lỗi: "Không thể tải mã QR. Vui lòng kiểm tra kết nối server."

**Nguyên nhân:** Backend server chưa chạy hoặc không kết nối được.

**Giải pháp:**
1. Kiểm tra backend server đang chạy: `http://localhost:3001/health`
2. Kiểm tra CORS đã được bật trong backend
3. Kiểm tra biến môi trường `VITE_API_BASE_URL` nếu có

### Lỗi: "Network Error" hoặc "CORS Error"

**Giải pháp:**
1. Đảm bảo backend server đang chạy
2. Kiểm tra file `backend/server.js` có `app.use(cors())`
3. Nếu frontend chạy ở port khác, thêm vào `.env`:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### QR Code không hiển thị

**Kiểm tra:**
1. Mở Developer Tools (F12) → Console
2. Xem có lỗi nào không
3. Kiểm tra Network tab xem request đến API có thành công không
4. Kiểm tra response từ API có đúng format không

## 📝 Checklist Test

- [ ] Backend server chạy thành công tại port 3001
- [ ] Frontend chạy thành công
- [ ] Health check API hoạt động
- [ ] Tạo QR code sau khi đăng ký quyên góp
- [ ] Xem QR code trong Warehouse Manager
- [ ] Download QR code thành công
- [ ] Quét QR code tìm thấy lô hàng
- [ ] Nhập mã tracking thủ công tìm thấy lô hàng
- [ ] QR code hiển thị đúng với mã tracking
- [ ] QR code có thể scan được bằng điện thoại

## 🎯 Kết Quả Mong Đợi

Sau khi hoàn thành tất cả các bước test:

1. ✅ Người dùng có thể tạo QR code sau khi đăng ký quyên góp
2. ✅ Warehouse manager có thể xem QR code của mỗi lô hàng
3. ✅ Có thể quét QR code để tìm kiếm lô hàng nhanh chóng
4. ✅ QR code có thể download và in ra để sử dụng offline
5. ✅ QR code chứa đúng mã tracking và có thể scan được

## 💡 Tips

- Sử dụng điện thoại để scan QR code thực tế để đảm bảo nó hoạt động
- Test với nhiều mã tracking khác nhau
- Kiểm tra QR code trên các kích thước khác nhau (size parameter)
- Test cả PNG và SVG format

