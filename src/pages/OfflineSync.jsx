import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Wifi, WifiOff, CheckCircle, AlertCircle } from 'lucide-react'
import '../styles/OfflineSync.css'

function OfflineSync() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSync, setPendingSync] = useState(3)
  const [syncing, setSyncing] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setPendingSync(0)
      alert('Đồng bộ thành công!')
    }, 2000)
  }

  return (
    <div className="offline-sync-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Đồng bộ dữ liệu</h1>
        </div>
      </header>

      <div className="sync-container">
        <div className="connection-status">
          {isOnline ? (
            <div className="status-card online">
              <Wifi size={48} />
              <h2>Đang kết nối</h2>
              <p>Hệ thống đang hoạt động bình thường</p>
            </div>
          ) : (
            <div className="status-card offline">
              <WifiOff size={48} />
              <h2>Chế độ Offline</h2>
              <p>Dữ liệu sẽ được lưu cục bộ và đồng bộ khi có kết nối</p>
            </div>
          )}
        </div>

        <div className="sync-info">
          <div className="info-card">
            <AlertCircle size={32} />
            <div>
              <h3>{pendingSync}</h3>
              <p>Dữ liệu chờ đồng bộ</p>
            </div>
          </div>
          <div className="info-card">
            <CheckCircle size={32} />
            <div>
              <h3>15</h3>
              <p>Đã đồng bộ hôm nay</p>
            </div>
          </div>
        </div>

        {pendingSync > 0 && (
          <div className="pending-items">
            <h3>Dữ liệu chờ đồng bộ</h3>
            <div className="pending-list">
              <div className="pending-item">
                <span>Yêu cầu cứu trợ #12345</span>
                <span className="time">5 phút trước</span>
              </div>
              <div className="pending-item">
                <span>Cập nhật trạng thái #12344</span>
                <span className="time">10 phút trước</span>
              </div>
              <div className="pending-item">
                <span>Xác nhận giao hàng #12343</span>
                <span className="time">15 phút trước</span>
              </div>
            </div>
          </div>
        )}

        <button
          className="btn btn-primary btn-sync"
          onClick={handleSync}
          disabled={syncing || !isOnline || pendingSync === 0}
        >
          <RefreshCw size={20} className={syncing ? 'spinning' : ''} />
          {syncing ? 'Đang đồng bộ...' : 'Đồng bộ ngay'}
        </button>

        <div className="sync-settings">
          <h3>Cài đặt đồng bộ</h3>
          <label>
            <input type="checkbox" defaultChecked />
            Tự động đồng bộ khi có kết nối
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            Chỉ đồng bộ qua WiFi
          </label>
        </div>
      </div>
    </div>
  )
}

export default OfflineSync
