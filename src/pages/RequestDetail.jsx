import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, MapPin, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { mockRequests, requestTypes, requestStatuses } from '../data/mockData'
import '../styles/RequestDetail.css'

function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const request = mockRequests.find(r => r.id === parseInt(id))
  const [currentStatus, setCurrentStatus] = useState(request?.status || 'OPEN')

  if (!request) {
    return (
      <div className="request-detail-page">
        <div className="error-state">
          <h2>Không tìm thấy yêu cầu</h2>
          <Link to="/requests" className="btn btn-primary">Quay lại danh sách</Link>
        </div>
      </div>
    )
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffMs = now - created
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffHours > 0) return `${diffHours} giờ trước`
    return `${diffMins} phút trước`
  }

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus)
    // In real app, this would call an API
    alert(`Đã cập nhật trạng thái thành: ${requestStatuses[newStatus].label}`)
  }

  return (
    <div className="request-detail-page">
      <header className="header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1>Chi tiết yêu cầu</h1>
        </div>
      </header>

      <div className="detail-container">
        <div className={`detail-card ${request.isCritical ? 'critical' : ''}`}>
          <div className="detail-header">
            <div className="header-badges">
              <span
                className={`status-badge status-${currentStatus.toLowerCase()}`}
                style={{ backgroundColor: requestStatuses[currentStatus].color }}
              >
                {requestStatuses[currentStatus].label}
              </span>
              {request.isCritical && (
                <span className="critical-badge">
                  <AlertCircle size={16} />
                  Khẩn cấp
                </span>
              )}
            </div>
            <span className="request-id">ID: #{request.id}</span>
          </div>

          <h2 className="contact-name">{request.contactName}</h2>

          <div className="detail-section">
            <h3>Thông tin liên hệ</h3>
            <div className="info-grid">
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <span className="info-label">Số điện thoại</span>
                  <span className="info-value">{request.phoneNumber}</span>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <span className="info-label">Địa chỉ</span>
                  <span className="info-value">{request.addressText}</span>
                </div>
              </div>
              <div className="info-item">
                <Users size={18} />
                <div>
                  <span className="info-label">Số người</span>
                  <span className="info-value">{request.headCount} người</span>
                </div>
              </div>
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <span className="info-label">Thời gian gửi</span>
                  <span className="info-value">{getTimeAgo(request.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Loại yêu cầu</h3>
            <span
              className="type-badge-large"
              style={{ backgroundColor: requestTypes[request.type].color }}
            >
              {requestTypes[request.type].label}
            </span>
          </div>

          <div className="detail-section">
            <h3>Mô tả chi tiết</h3>
            <p className="description">{request.description}</p>
          </div>

          <div className="detail-section">
            <h3>Tọa độ GPS</h3>
            <div className="coordinates">
              <span>Vĩ độ: {request.location.lat}</span>
              <span>Kinh độ: {request.location.lng}</span>
            </div>
          </div>

          {currentStatus === 'OPEN' && (
            <div className="action-buttons">
              <button
                className="btn btn-primary"
                onClick={() => handleStatusChange('PROCESSING')}
              >
                <CheckCircle size={20} />
                Bắt đầu xử lý
              </button>
            </div>
          )}

          {currentStatus === 'PROCESSING' && (
            <div className="action-buttons">
              <button
                className="btn btn-success"
                onClick={() => handleStatusChange('RESCUED')}
              >
                <CheckCircle size={20} />
                Đã cứu thành công
              </button>
            </div>
          )}

          {currentStatus === 'RESCUED' && (
            <div className="success-message">
              <CheckCircle size={24} />
              <span>Đã hoàn thành cứu hộ</span>
            </div>
          )}
        </div>

        <div className="map-preview">
          <h3>Vị trí trên bản đồ</h3>
          <Link to="/map" className="btn btn-secondary">
            Xem trên bản đồ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RequestDetail
