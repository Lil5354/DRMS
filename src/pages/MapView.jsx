import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { AlertCircle, Phone, MapPin, Users, Plus, List } from 'lucide-react'
import L from 'leaflet'
import { mockRequests, requestTypes, requestStatuses } from '../data/mockData'
import '../styles/MapView.css'

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function MapView() {
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')

  const filteredRequests = mockRequests.filter(req => {
    if (selectedType !== 'ALL' && req.type !== selectedType) return false
    if (selectedStatus !== 'ALL' && req.status !== selectedStatus) return false
    return true
  })

  return (
    <div className="map-view">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">FloodLink</h1>
          <div className="header-actions">
            <Link to="/requests" className="btn btn-secondary">
              <List size={20} />
              Danh sách
            </Link>
            <Link to="/sos" className="btn btn-primary">
              <Plus size={20} />
              Gửi SOS
            </Link>
          </div>
        </div>
      </header>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Loại yêu cầu:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="ALL">Tất cả</option>
            <option value="EVACUATION">Sơ tán khẩn</option>
            <option value="MEDICAL">Y tế</option>
            <option value="SUPPLIES">Lương thực</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Trạng thái:</label>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="ALL">Tất cả</option>
            <option value="OPEN">Chờ cứu hộ</option>
            <option value="PROCESSING">Đang xử lý</option>
            <option value="RESCUED">Đã cứu</option>
          </select>
        </div>
        <div className="filter-stats">
          <span className="stat-badge stat-danger">{mockRequests.filter(r => r.status === 'OPEN').length} Chờ cứu</span>
          <span className="stat-badge stat-warning">{mockRequests.filter(r => r.isCritical).length} Khẩn cấp</span>
        </div>
      </div>

      <MapContainer
        center={[21.0285, 105.8542]}
        zoom={14}
        style={{ height: 'calc(100vh - 140px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredRequests.map((request) => (
          <Marker
            key={request.id}
            position={[request.location.lat, request.location.lng]}
            icon={createCustomIcon(requestStatuses[request.status].color)}
          >
            <Popup>
              <div className="popup-content">
                <div className="popup-header">
                  <span className={`status-badge status-${request.status.toLowerCase()}`}>
                    {requestStatuses[request.status].label}
                  </span>
                  {request.isCritical && (
                    <span className="critical-badge">
                      <AlertCircle size={14} />
                      Khẩn cấp
                    </span>
                  )}
                </div>
                <h3>{request.contactName}</h3>
                <div className="popup-info">
                  <div className="info-row">
                    <Phone size={14} />
                    <span>{request.phoneNumber}</span>
                  </div>
                  <div className="info-row">
                    <MapPin size={14} />
                    <span>{request.addressText}</span>
                  </div>
                  <div className="info-row">
                    <Users size={14} />
                    <span>{request.headCount} người</span>
                  </div>
                </div>
                <div className="popup-type">
                  <span style={{ color: requestTypes[request.type].color }}>
                    {requestTypes[request.type].label}
                  </span>
                </div>
                <Link to={`/requests/${request.id}`} className="btn-link">
                  Xem chi tiết →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
