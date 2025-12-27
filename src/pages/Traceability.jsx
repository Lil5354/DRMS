import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Package, Truck, CheckCircle, Clock, QrCode } from 'lucide-react'
import QRScanner from '../components/QRScanner'
import '../styles/Traceability.css'
import '../styles/QRScanner.css'

function Traceability() {
  const [searchId, setSearchId] = useState('')
  const [result, setResult] = useState(null)
  const [showScanner, setShowScanner] = useState(false)

  const mockData = {
    '12345': {
      id: '12345',
      requester: 'Nguyễn Văn A',
      items: ['Gạo 50kg', 'Nước uống 20 lít'],
      status: 'DELIVERED',
      timeline: [
        { step: 'Yêu cầu tạo', time: '10:00 15/12/2025', status: 'completed' },
        { step: 'Đã nhập kho', time: '11:30 15/12/2025', status: 'completed' },
        { step: 'Đang vận chuyển', time: '14:00 15/12/2025', status: 'completed' },
        { step: 'Đã giao hàng', time: '16:30 15/12/2025', status: 'completed' }
      ]
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(searchId)
  }

  const performSearch = (id) => {
    if (mockData[id]) {
      setResult(mockData[id])
    } else {
      setResult({ notFound: true })
    }
  }

  const handleQRScan = (decodedText) => {
    console.log('QR scanned:', decodedText)
    setSearchId(decodedText)
    performSearch(decodedText)
    setShowScanner(false)
  }

  console.log('showScanner state:', showScanner)

  return (
    <div className="traceability-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Tra cứu hàng cứu trợ</h1>
        </div>
      </header>

      <div className="search-container">
        <div className="qr-scan-section">
          <div className="qr-frame-area">
            <div className="qr-placeholder">
              <QrCode size={80} />
              <p>Đưa mã QR vào khung hình</p>
            </div>
            <button 
              onClick={() => setShowScanner(true)} 
              className="btn btn-primary btn-camera"
            >
              <QrCode size={20} />
              Bật camera
            </button>
          </div>
        </div>

        <div className="divider">
          <span>Hoặc nhập mã thủ công</span>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Nhập mã tracking (VD: TRK001234)"
            className="search-input"
          />
          <button type="submit" className="btn btn-search">
            <Search size={20} />
            Tìm
          </button>
        </form>

        <div className="instructions">
          <div className="instruction-icon">ℹ️</div>
          <div className="instruction-content">
            <h4>Hướng dẫn</h4>
            <ul>
              <li>Yêu cầu người quyên góp xuất trình mã QR trên điện thoại</li>
              <li>Quét mã để tự động điền thông tin lô hàng</li>
              <li>Kiểm tra và xác nhận nhập kho</li>
            </ul>
          </div>
        </div>
      </div>

      {showScanner && (
        <QRScanner 
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {result && (
        <div className="result-container">
          {result.notFound ? (
            <div className="not-found">
              <Package size={48} />
              <p>Không tìm thấy thông tin</p>
            </div>
          ) : (
            <div className="tracking-info">
              <div className="info-header">
                <h2>Mã: #{result.id}</h2>
                <span className="status-badge status-delivered">Đã giao</span>
              </div>

              <div className="info-section">
                <h3>Người nhận: {result.requester}</h3>
                <div className="items-list">
                  {result.items.map((item, idx) => (
                    <div key={idx} className="item">
                      <Package size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="timeline">
                <h3>Lịch sử vận chuyển</h3>
                {result.timeline.map((event, idx) => (
                  <div key={idx} className={`timeline-item ${event.status}`}>
                    <div className="timeline-icon">
                      {event.status === 'completed' ? <CheckCircle size={20} /> : <Clock size={20} />}
                    </div>
                    <div className="timeline-content">
                      <h4>{event.step}</h4>
                      <p>{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Traceability
