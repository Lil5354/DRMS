import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, Phone, MapPin, Users, Clock, Filter } from 'lucide-react'
import { mockRequests, requestTypes, requestStatuses } from '../data/mockData'
import '../styles/RequestList.css'

function RequestList() {
  const [filterType, setFilterType] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [showFilters, setShowFilters] = useState(false)

  const filteredRequests = mockRequests.filter(req => {
    if (filterType !== 'ALL' && req.type !== filterType) return false
    if (filterStatus !== 'ALL' && req.status !== filterStatus) return false
    return true
  })

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffMs = now - created
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffHours > 0) return `${diffHours} giờ trước`
    return `${diffMins} phút trước`
  }

  return (
    <div className="request-list-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Danh sách yêu cầu</h1>
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} />
          </button>
        </div>
      </header>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <label>Loại:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="ALL">Tất cả</option>
              <option value="EVACUATION">Sơ tán khẩn</option>
              <option value="MEDICAL">Y tế</option>
              <option value="SUPPLIES">Lương thực</option>
            </select>
          </div>
          <div className="filter-row">
            <label>Trạng thái:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">Tất cả</option>
              <option value="OPEN">Chờ cứu hộ</option>
              <option value="PROCESSING">Đang xử lý</option>
              <option value="RESCUED">Đã cứu</option>
            </select>
          </div>
        </div>
      )}

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{filteredRequests.length}</span>
          <span className="stat-label">Tổng số</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-danger">
            {filteredRequests.filter(r => r.status === 'OPEN').length}
          </span>
          <span className="stat-label">Chờ cứu</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-warning">
            {filteredRequests.filter(r => r.isCritical).length}
          </span>
          <span className="stat-label">Khẩn cấp</span>
        </div>
      </div>

      <div className="request-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <p>Không có yêu cầu nào</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <Link
              key={request.id}
              to={`/requests/${request.id}`}
              className="request-card"
            >
              <div className="card-header">
                <div className="card-badges">
                  <span
                    className={`status-badge status-${request.status.toLowerCase()}`}
                    style={{ backgroundColor: requestStatuses[request.status].color }}
                  >
                    {requestStatuses[request.status].label}
                  </span>
                  {request.isCritical && (
                    <span className="critical-badge">
                      <AlertCircle size={14} />
                      Khẩn cấp
                    </span>
                  )}
                </div>
                <span className="time-ago">
                  <Clock size={14} />
                  {getTimeAgo(request.createdAt)}
                </span>
              </div>

              <h3 className="card-title">{request.contactName}</h3>

              <div className="card-info">
                <div className="info-item">
                  <Phone size={16} />
                  <span>{request.phoneNumber}</span>
                </div>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{request.addressText}</span>
                </div>
                <div className="info-item">
                  <Users size={16} />
                  <span>{request.headCount} người</span>
                </div>
              </div>

              <div className="card-footer">
                <span
                  className="type-badge"
                  style={{ color: requestTypes[request.type].color }}
                >
                  {requestTypes[request.type].label}
                </span>
                <span className="view-detail">Xem chi tiết →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default RequestList
