import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle, FileText } from 'lucide-react'
import '../styles/POD.css'

function POD() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    shipmentId: '',
    receiverName: '',
    receiverPhone: '',
    notes: '',
    photo: null
  })

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({...formData, photo: URL.createObjectURL(file)})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Đã gửi bằng chứng giao hàng thành công!')
    navigate('/schedule')
  }

  return (
    <div className="pod-page">
      <header className="header">
        <div className="header-content">
          <Link to="/schedule" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Xác nhận giao hàng (POD)</h1>
        </div>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="pod-form">
          <div className="form-group">
            <label>Mã vận đơn</label>
            <input
              type="text"
              value={formData.shipmentId}
              onChange={(e) => setFormData({...formData, shipmentId: e.target.value})}
              placeholder="Nhập mã vận đơn"
              required
            />
          </div>

          <div className="form-group">
            <label>Tên người nhận</label>
            <input
              type="text"
              value={formData.receiverName}
              onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
              placeholder="Họ tên người nhận hàng"
              required
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại người nhận</label>
            <input
              type="tel"
              value={formData.receiverPhone}
              onChange={(e) => setFormData({...formData, receiverPhone: e.target.value})}
              placeholder="0912345678"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Camera size={18} />
              Ảnh xác nhận
            </label>
            <div className="photo-upload">
              {formData.photo ? (
                <div className="photo-preview">
                  <img src={formData.photo} alt="Preview" />
                  <button type="button" onClick={() => setFormData({...formData, photo: null})}>
                    Xóa ảnh
                  </button>
                </div>
              ) : (
                <label className="upload-label">
                  <Camera size={32} />
                  <span>Chụp ảnh hoặc tải lên</span>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </label>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>
              <FileText size={18} />
              Ghi chú
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Ghi chú về quá trình giao hàng..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Hủy
            </button>
            <button type="submit" className="btn btn-success">
              <CheckCircle size={20} />
              Xác nhận giao hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default POD
