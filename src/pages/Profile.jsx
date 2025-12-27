import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, MapPin, Shield, Edit2, Save, LogOut } from 'lucide-react'
import '../styles/Profile.css'

function Profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0912345678',
    address: 'Số 1, Đường ABC, Quận Hoàn Kiếm, Hà Nội',
    role: 'VOLUNTEER'
  })

  const roleLabels = {
    REQUESTER: 'Người yêu cầu',
    DONOR: 'Nhà tài trợ',
    VOLUNTEER: 'Tình nguyện viên',
    MANAGER: 'Quản lý',
    ADMIN: 'Quản trị viên'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    alert('Đã cập nhật thông tin!')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    alert('Đã đăng xuất!')
    navigate('/login')
  }

  return (
    <div className="profile-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Thông tin cá nhân</h1>
          {!isEditing ? (
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
              <Edit2 size={20} />
              Chỉnh sửa
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={20} />
              Lưu
            </button>
          )}
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <User size={48} />
            </div>
            <h2>{formData.name}</h2>
            <span className="role-badge">
              <Shield size={16} />
              {roleLabels[formData.role]}
            </span>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>
                <User size={18} />
                Họ và tên
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{formData.name}</p>
              )}
            </div>

            <div className="form-group">
              <label>
                <Mail size={18} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{formData.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>
                <Phone size={18} />
                Số điện thoại
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{formData.phone}</p>
              )}
            </div>

            <div className="form-group">
              <label>
                <MapPin size={18} />
                Địa chỉ
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                />
              ) : (
                <p>{formData.address}</p>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-secondary btn-full">
              Đổi mật khẩu
            </button>
            <button className="btn btn-danger btn-full" onClick={handleLogout}>
              <LogOut size={20} />
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="activity-card">
          <h3>Hoạt động gần đây</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📦</div>
              <div className="activity-content">
                <p>Đăng ký ứng trợ 50kg gạo</p>
                <span>2 giờ trước</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🚚</div>
              <div className="activity-content">
                <p>Hoàn thành vận chuyển #12345</p>
                <span>1 ngày trước</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p>Xác nhận giao hàng #12344</p>
                <span>2 ngày trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
