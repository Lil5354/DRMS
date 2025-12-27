# Script để khởi động Vite dev server và mở trình duyệt
Write-Host "Đang khởi động server..." -ForegroundColor Green

# Chạy server trong background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Minimized

# Đợi server khởi động
Write-Host "Đợi server khởi động..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Kiểm tra xem port 5173 đã sẵn sàng chưa
$portReady = $false
$maxAttempts = 10
$attempt = 0

while (-not $portReady -and $attempt -lt $maxAttempts) {
    $connection = netstat -ano | findstr :5173
    if ($connection) {
        $portReady = $true
        Write-Host "Server đã sẵn sàng trên port 5173!" -ForegroundColor Green
        break
    }
    $attempt++
    Start-Sleep -Seconds 2
    Write-Host "Đang đợi... ($attempt/$maxAttempts)" -ForegroundColor Yellow
}

# Mở trình duyệt
if ($portReady) {
    Write-Host "Đang mở trình duyệt..." -ForegroundColor Green
    Start-Process "http://localhost:5173"
} else {
    Write-Host "Không thể kết nối đến server. Vui lòng kiểm tra lại." -ForegroundColor Red
    Write-Host "Thử truy cập thủ công: http://localhost:5173" -ForegroundColor Yellow
}

