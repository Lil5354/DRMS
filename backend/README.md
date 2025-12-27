# DRMS Backend API

Backend API cho hệ thống DRMS - Tạo mã QR từ tracking ID cho mỗi hàng.

## 📋 Yêu Cầu

- Node.js >= 14.0.0
- npm hoặc yarn

## 🚀 Cài Đặt

1. **Cài đặt dependencies:**
```bash
cd backend
npm install
```

2. **Tạo file .env:**
```bash
cp .env.example .env
```

3. **Chỉnh sửa .env nếu cần:**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🏃 Chạy Server

**Development mode (với nodemon - tự động restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:3001`

## 📚 API Endpoints

### 1. Health Check
```
GET /health
```
Kiểm tra trạng thái server.

**Response:**
```json
{
  "status": "OK",
  "message": "DRMS Backend Server is running",
  "timestamp": "2026-01-01T14:20:00.000Z"
}
```

### 2. Tạo QR Code (Image)
```
GET /api/qr/:trackingId
```
Tạo mã QR từ tracking ID và trả về dưới dạng image (PNG hoặc SVG).

**Parameters:**
- `trackingId` (path): Mã tracking (ví dụ: TRK001235)

**Query Parameters:**
- `format` (optional): `png` (default) hoặc `svg`
- `size` (optional): Kích thước QR code (100-2000 pixels, default: 300)
- `margin` (optional): Margin của QR code (0-10, default: 2)

**Ví dụ:**
```
GET /api/qr/TRK001235
GET /api/qr/TRK001235?format=png&size=400&margin=3
GET /api/qr/TRK001235?format=svg&size=500
```

**Response:** Image file (PNG hoặc SVG)

### 3. Tạo QR Code (Data URL)
```
GET /api/qr/:trackingId/data
```
Trả về dữ liệu QR code dưới dạng base64 (để embed trong HTML).

**Parameters:**
- `trackingId` (path): Mã tracking

**Query Parameters:**
- `size` (optional): Kích thước QR code (100-2000 pixels, default: 300)
- `margin` (optional): Margin của QR code (0-10, default: 2)

**Ví dụ:**
```
GET /api/qr/TRK001235/data
GET /api/qr/TRK001235/data?size=400&margin=3
```

**Response:**
```json
{
  "success": true,
  "trackingId": "TRK001235",
  "dataUrl": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "format": "png",
  "size": 300
}
```

### 4. Tạo Nhiều QR Code (Batch)
```
POST /api/qr/batch
```
Tạo nhiều QR code cùng lúc từ danh sách tracking IDs.

**Request Body:**
```json
{
  "trackingIds": ["TRK001235", "TRK001236", "TRK001237"],
  "size": 300,
  "margin": 2
}
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "qrCodes": [
    {
      "trackingId": "TRK001235",
      "dataUrl": "data:image/png;base64,iVBORw0KGgoAAAANS...",
      "success": true
    },
    {
      "trackingId": "TRK001236",
      "dataUrl": "data:image/png;base64,iVBORw0KGgoAAAANS...",
      "success": true
    },
    {
      "trackingId": "TRK001237",
      "dataUrl": "data:image/png;base64,iVBORw0KGgoAAAANS...",
      "success": true
    }
  ]
}
```

## 💡 Cách Sử Dụng trong Frontend

### 1. Hiển thị QR Code dưới dạng Image
```javascript
// Sử dụng trực tiếp trong thẻ img
<img src={`http://localhost:3001/api/qr/${trackingCode}`} alt="QR Code" />

// Hoặc với các tùy chọn
<img 
  src={`http://localhost:3001/api/qr/${trackingCode}?size=400&margin=3`} 
  alt="QR Code" 
/>
```

### 2. Lấy Data URL để xử lý
```javascript
const response = await fetch(`http://localhost:3001/api/qr/${trackingCode}/data`);
const data = await response.json();
const qrDataUrl = data.dataUrl;

// Sử dụng trong img tag
<img src={qrDataUrl} alt="QR Code" />
```

### 3. Tạo nhiều QR code cùng lúc
```javascript
const response = await fetch('http://localhost:3001/api/qr/batch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    trackingIds: ['TRK001235', 'TRK001236', 'TRK001237'],
    size: 300,
    margin: 2
  })
});

const result = await response.json();
result.qrCodes.forEach(qr => {
  console.log(qr.trackingId, qr.dataUrl);
});
```

## 🔒 Error Handling

Tất cả các endpoints đều trả về lỗi với format chuẩn:

```json
{
  "error": "Error Type",
  "message": "Mô tả lỗi bằng tiếng Việt"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (thiếu hoặc sai tham số)
- `404`: Not Found (route không tồn tại)
- `500`: Internal Server Error (lỗi server)

## 📝 Notes

- QR code chứa tracking ID dạng text thuần (ví dụ: "TRK001235")
- Có thể scan QR code để lấy tracking ID và tra cứu thông tin hàng
- QR code được cache 1 giờ (cho PNG format)
- Tối đa 50 tracking IDs mỗi lần batch request

## 🛠️ Development

**Cấu trúc thư mục:**
```
backend/
├── routes/
│   └── qr.js          # QR code routes
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env.example       # Environment variables template
└── README.md          # Documentation
```

## 📦 Dependencies

- **express**: Web framework
- **qrcode**: Thư viện tạo QR code
- **cors**: Xử lý CORS
- **dotenv**: Quản lý environment variables

