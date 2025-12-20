import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Package, MapPin, Calendar, Phone, Filter, Plus } from 'lucide-react'
import '../styles/OffersList.css'

function OffersList() {
  const [offers] = useState([
    { id: 1, donor: 'Công ty A', item: 'Gạo', quantity: 500, unit: 'kg', location: 'Hà Nội', phone: '0912345678', date: '16/12/2025', status: 'AVAILABLE' },
    { id: 2, donor: 'Nhà hảo tâm B', item: 'Nước uống', quantity: 200, unit: 'lít', location: 'Hà Nội', phone: '0987654321', date: '16/12/2025', status: 'AVAILABLE' },
    { id: 3, donor: 'Tình nguyện viên C', item: 'Xe tải', quantity: 1, unit: 'chiếc', location: 'Hà Nội', phone: '0901234567', date: '17/12/2025', status: 'RESERVED' },
    { id: 4, donor: 'Công ty D', item: 'Thuốc men', quantity: 50, unit: 'hộp', location: 'Hà Nội', phone: '0976543210', date: '15/12/2025', status: 'COMPLETED' }
  ])

  const [filterStatus, setFilterStatus] = useState('ALL')

  const filteredOffers = offers.filter(offer => 
    filterStatus === 'ALL' || offer.status === filterStatus
  )

  const statusLabels = {
    AVAILABLE: 'Sẵn sàng',
    RESERVED: 'Đã đặt',
    COMPLETED: 'Đã giao'
  }

  const statusColors = {
    AVAILABLE: '#10b981',
    RESERVED: '#f59e0b',
    COMPLETED: '#6b7280'
  }

  return (
    <div className="offers-list-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Danh sách ứng trợ</h1>
          <Link to="/offers/create" className="btn btn-primary">
            <Plus size={20} />
            Đăng ký ứng trợ
          </Link>
        </div>
      </header>

      <div className="offers-container">
        <div className="filter-bar">
          <div className="filter-group">
            <Filter size={18} />
            <label>Trạng thái:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">Tất cả</option>
              <option value="AVAILABLE">Sẵn sàng</option>
              <option value="RESERVED">Đã đặt</option>
              <option value="COMPLETED">Đã giao</option>
            </select>
          </div>
          <div className="stats">
            <span className="stat-item">
              <strong>{filteredOffers.length}</strong> ứng trợ
            </span>
          </div>
        </div>

        <div className="offers-grid">
          {filteredOffers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <h3>{offer.item}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: statusColors[offer.status] }}
                >
                  {statusLabels[offer.status]}
                </span>
              </div>

              <div className="offer-body">
                <div className="offer-info">
                  <Package size={16} />
                  <span>{offer.quantity} {offer.unit}</span>
                </div>
                <div className="offer-info">
                  <MapPin size={16} />
                  <span>{offer.location}</span>
                </div>
                <div className="offer-info">
                  <Calendar size={16} />
                  <span>{offer.date}</span>
                </div>
              </div>

              <div className="offer-footer">
                <div className="donor-info">
                  <strong>{offer.donor}</strong>
                  <div className="phone-info">
                    <Phone size={14} />
                    <span>{offer.phone}</span>
                  </div>
                </div>
                {offer.status === 'AVAILABLE' && (
                  <button className="btn btn-sm btn-primary">
                    Đặt hàng
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="empty-state">
            <Package size={48} />
            <p>Không có ứng trợ nào</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OffersList
