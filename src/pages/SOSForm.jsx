import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, Phone, MapPin, Users, FileText } from 'lucide-react'
import '../styles/SOSForm.css'

function SOSForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    contactName: '',
    phoneNumber: '',
    addressText: '',
    type: 'EVACUATION',
    headCount: 1,
    description: '',
    isCritical: false,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Vui lòng nhập tên liên hệ'
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ (10 chữ số)'
    }
    if (!formData.addressText.trim()) {
      newErrors.addressText = 'Vui lòng nhập địa chỉ'
    }
    if (formData.headCount < 1) {
      newErrors.headCount = 'Số người phải lớn hơn 0'
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

    // In real app, this would call an API
    console.log('Submitting SOS request:', formData)
    alert('Đã gửi yêu cầu cứu hộ thành công! Đội cứu hộ sẽ liên hệ sớm nhất.')
    navigate('/requests')
  }

  return (
    <div className="sos-form-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Gửi yêu cầu SOS</h1>
        </div>
      </header>

      <div className="form-container">
        <div className="alert-box">
          <AlertCircle size={20} />
          <p>Vui lòng cung cấp thông tin chính xác để đội cứu hộ có thể hỗ trợ bạn nhanh nhất</p>
        </div>

        <form onSubmit={handleSubmit} className="sos-form">
          <div className="form-group">
            <label htmlFor="contactName">
              <Phone size={18} />
              Tên người liên hệ <span className="required">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Họ và tên người liên hệ"
              className={errors.contactName ? 'error' : ''}
            />
            {errors.contactName && <span className="error-message">{errors.contactName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">
              <Phone size={18} />
              Số điện thoại <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0912345678"
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="addressText">
              <MapPin size={18} />
              Địa chỉ cụ thể <span className="required">*</span>
            </label>
            <input
              type="text"
              id="addressText"
              name="addressText"
              value={formData.addressText}
              onChange={handleChange}
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
              className={errors.addressText ? 'error' : ''}
            />
            {errors.addressText && <span className="error-message">{errors.addressText}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">
              <AlertCircle size={18} />
              Loại yêu cầu <span className="required">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="EVACUATION">Sơ tán khẩn cấp</option>
              <option value="MEDICAL">Cần y tế</option>
              <option value="SUPPLIES">Cần lương thực</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="headCount">
              <Users size={18} />
              Số người cần cứu hộ <span className="required">*</span>
            </label>
            <input
              type="number"
              id="headCount"
              name="headCount"
              value={formData.headCount}
              onChange={handleChange}
              min="1"
              className={errors.headCount ? 'error' : ''}
            />
            {errors.headCount && <span className="error-message">{errors.headCount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <FileText size={18} />
              Mô tả tình huống
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết tình trạng hiện tại, đặc điểm nhà, có người già/trẻ em không..."
              rows="4"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isCritical"
                checked={formData.isCritical}
                onChange={handleChange}
              />
              <span>Đây là tình huống khẩn cấp (có người bị thương, nguy hiểm tính mạng)</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn btn-danger">
              <AlertCircle size={20} />
              Gửi yêu cầu SOS
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SOSForm
