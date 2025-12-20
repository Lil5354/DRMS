import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, QrCode, CheckCircle, Camera } from 'lucide-react'
import '../styles/QRCheckIn.css'

function QRCheckIn() {
  const [scanned, setScanned] = useState(false)
  const [checkInData, setCheckInData] = useState(null)

  const handleScan = () => {
    // Mock QR scan
    setTimeout(() => {
      setCheckInData({
        id: '12345',
        name: 'Nguyễn Văn A',
        location: 'Điểm cứu trợ Hoàn Kiếm',
        time: new Date().toLocaleString('vi-VN')
      })
      setScanned(true)
    }, 1000)
  }

  return (
    <div className="qr-checkin-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Điểm danh QR</h1>
        </div>
      </header>

      <div className="qr-container">
        {!scanned ? (
          <div className="scan-area">
            <div className="qr-frame">
              <QrCode size={120} />
            </div>
            <p>Đưa mã QR vào khung để quét</p>
            <button className="btn btn-primary" onClick={handleScan}>
              <Camera size={20} />
              Bắt đầu quét
            </button>
          </div>
        ) : (
          <div className="success-area">
            <CheckCircle size={80} className="success-icon" />
            <h2>Điểm danh thành công!</h2>
            <div className="checkin-info">
              <div className="info-row">
                <span className="label">Mã:</span>
                <span className="value">{checkInData.id}</span>
              </div>
              <div className="info-row">
                <span className="label">Người nhận:</span>
                <span className="value">{checkInData.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Địa điểm:</span>
                <span className="value">{checkInData.location}</span>
              </div>
              <div className="info-row">
                <span className="label">Thời gian:</span>
                <span className="value">{checkInData.time}</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setScanned(false)}>
              Quét mã khác
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCheckIn
