import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, MapPin, User, Truck, Calendar, Clock, CheckCircle } from 'lucide-react'
import '../styles/ShipmentDetail.css'

function ShipmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const shipment = {
    id: id,
    requestId: '12345',
    items: 'Gạo 50kg, Nước uống 20 lít',
    destination: 'Số 10, Đường XYZ, Quận Hoàn Kiếm, Hà Nội',
    driver: 'Nguyễn Văn A',
    vehicle: 'Xe tải 29A-12345',
    scheduledDate: '16/12/2025',
    scheduledTime: '14:00',
    status: 'IN_TRANSIT',
    createdAt: '15/12/2025 10:00'
  }

  const statusLabels = {
    PENDING: 'Chờ xử lý',
    CONFIRMED: 'Đã xác nhận',
    IN_TRANSIT: 'Đang vận chuyển',
    DELIVERED: 'Đã giao hàng'
  }

  const timeline = [
    { step: 'Tạo vận đơn', time: '15/12/2025 10:00', status: 'completed' },
    { step: 'Xác nhận', time: '15/12/2025 11:00', status: 'completed' },
    { step: 'Đang vận chuyển', time: '16/12/2025 14:00', status: 'current' },
    { step: 'Giao hàng', time: 'Chưa hoàn thành', status: 'pending' }
  ]

  return (
    <div className="shipment-detail-page">
      <header className="header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1>Chi tiết vận đơn</h1>
        </div>
      </header>

      <div className="detail-container">
        <div className="shipment-card">
          <div className="card-header">
            <h2>Vận đơn #{shipment.id}</h2>
            <span className="status-badge status-in-transit">
              {statusLabels[shipment.status]}
            </span>
          </div>

          <div className="info-section">
            <h3>Thông tin hàng hóa</h3>
            <div className="info-item">
              <Package size={18} />
              <div>
                <span className="label">Hàng hóa</span>
                <span className="value">{shipment.items}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Thông tin giao hàng</h3>
            <div className="info-item">
              <MapPin size={18} />
              <div>
                <span className="label">Điểm đến</span>
                <span className="value">{shipment.destination}</span>
              </div>
            </div>
            <div className="info-item">
              <Calendar size={18} />
              <div>
                <span className="label">Ngày giao</span>
                <span className="value">{shipment.scheduledDate}</span>
              </div>
            </div>
            <div className="info-item">
              <Clock size={18} />
              <div>
                <span className="label">Giờ giao</span>
                <span className="value">{shipment.scheduledTime}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Thông tin vận chuyển</h3>
            <div className="info-item">
              <User size={18} />
              <div>
                <span className="label">Tài xế</span>
                <span className="value">{shipment.driver}</span>
              </div>
            </div>
            <div className="info-item">
              <Truck size={18} />
              <div>
                <span className="label">Phương tiện</span>
                <span className="value">{shipment.vehicle}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-card">
          <h3>Lịch sử vận chuyển</h3>
          <div className="timeline">
            {timeline.map((event, idx) => (
              <div key={idx} className={`timeline-item ${event.status}`}>
                <div className="timeline-icon">
                  {event.status === 'completed' && <CheckCircle size={20} />}
                  {event.status === 'current' && <Clock size={20} />}
                  {event.status === 'pending' && <div className="pending-dot"></div>}
                </div>
                <div className="timeline-content">
                  <h4>{event.step}</h4>
                  <p>{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {shipment.status === 'IN_TRANSIT' && (
          <Link to="/pod" className="btn btn-primary btn-full">
            <CheckCircle size={20} />
            Xác nhận giao hàng
          </Link>
        )}
      </div>
    </div>
  )
}

export default ShipmentDetail
