import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Truck, MapPin, Package, User } from 'lucide-react'
import '../styles/CreateShipment.css'

function CreateShipment() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    requestId: '',
    items: '',
    destination: '',
    driver: '',
    vehicle: '',
    scheduledDate: '',
    scheduledTime: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Đã tạo vận đơn thành công!')
    navigate('/schedule')
  }

  return (
    <div className="create-shipment-page">
      <header className="header">
        <div className="header-content">
          <Link to="/schedule" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Tạo vận đơn</h1>
        </div>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="shipment-form">
          <div className="form-group">
            <label>Mã yêu cầu</label>
            <input
              type="text"
              value={formData.requestId}
              onChange={(e) => setFormData({...formData, requestId: e.target.value})}
              placeholder="Nhập mã yêu cầu"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Package size={18} />
              Hàng hóa
            </label>
            <textarea
              value={formData.items}
              onChange={(e) => setFormData({...formData, items: e.target.value})}
              placeholder="Gạo 50kg, Nước 20 lít..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <MapPin size={18} />
              Điểm đến
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              placeholder="Địa chỉ giao hàng"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <User size={18} />
              Tài xế
            </label>
            <select
              value={formData.driver}
              onChange={(e) => setFormData({...formData, driver: e.target.value})}
              required
            >
              <option value="">Chọn tài xế</option>
              <option value="driver1">Nguyễn Văn A</option>
              <option value="driver2">Trần Văn B</option>
              <option value="driver3">Lê Văn C</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <Truck size={18} />
              Phương tiện
            </label>
            <select
              value={formData.vehicle}
              onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
              required
            >
              <option value="">Chọn xe</option>
              <option value="truck1">Xe tải 29A-12345</option>
              <option value="truck2">Xe tải 30B-67890</option>
              <option value="van1">Xe van 31C-11111</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày giao</label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Giờ giao</label>
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Tạo vận đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateShipment
