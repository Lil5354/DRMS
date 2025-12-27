import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Package, MapPin, Calendar, FileText } from 'lucide-react'
import '../styles/CreateOffer.css'

function CreateOffer() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    offerType: 'SUPPLIES',
    itemName: '',
    quantity: 1,
    unit: 'kg',
    location: '',
    availableDate: '',
    description: '',
    contactPhone: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.itemName.trim()) newErrors.itemName = 'Vui lòng nhập tên vật phẩm'
    if (formData.quantity < 1) newErrors.quantity = 'Số lượng phải lớn hơn 0'
    if (!formData.location.trim()) newErrors.location = 'Vui lòng nhập địa điểm'
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Số điện thoại không hợp lệ'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    alert('Đã đăng ký ứng trợ thành công!')
    navigate('/offers')
  }

  return (
    <div className="create-offer-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Đăng ký ứng trợ</h1>
        </div>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="offer-form">
          <div className="form-group">
            <label htmlFor="offerType">Loại ứng trợ</label>
            <select id="offerType" name="offerType" value={formData.offerType} onChange={handleChange}>
              <option value="SUPPLIES">Lương thực/Vật phẩm</option>
              <option value="TRANSPORT">Phương tiện vận chuyển</option>
              <option value="SHELTER">Nơi trú ẩn</option>
              <option value="MEDICAL">Y tế</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="itemName">
              <Package size={18} />
              Tên vật phẩm/dịch vụ <span className="required">*</span>
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Gạo, nước uống, thuốc..."
              className={errors.itemName ? 'error' : ''}
            />
            {errors.itemName && <span className="error-message">{errors.itemName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Số lượng</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className={errors.quantity ? 'error' : ''}
              />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="unit">Đơn vị</label>
              <select id="unit" name="unit" value={formData.unit} onChange={handleChange}>
                <option value="kg">kg</option>
                <option value="lít">lít</option>
                <option value="thùng">thùng</option>
                <option value="cái">cái</option>
                <option value="suất">suất</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={18} />
              Địa điểm <span className="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Địa chỉ cụ thể"
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="availableDate">
              <Calendar size={18} />
              Ngày có thể giao
            </label>
            <input
              type="date"
              id="availableDate"
              name="availableDate"
              value={formData.availableDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactPhone">Số điện thoại liên hệ <span className="required">*</span></label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="0912345678"
              className={errors.contactPhone ? 'error' : ''}
            />
            {errors.contactPhone && <span className="error-message">{errors.contactPhone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <FileText size={18} />
              Ghi chú
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Thông tin bổ sung..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Đăng ký ứng trợ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateOffer
