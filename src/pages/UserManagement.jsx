import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, Search, Edit, Trash2, Shield } from 'lucide-react'
import '../styles/UserManagement.css'

function UserManagement() {
  const [users] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'a@email.com', role: 'VOLUNTEER', status: 'ACTIVE' },
    { id: 2, name: 'Trần Thị B', email: 'b@email.com', role: 'DONOR', status: 'ACTIVE' },
    { id: 3, name: 'Lê Văn C', email: 'c@email.com', role: 'MANAGER', status: 'ACTIVE' }
  ])

  const roleLabels = {
    REQUESTER: 'Người yêu cầu',
    DONOR: 'Nhà tài trợ',
    VOLUNTEER: 'Tình nguyện viên',
    MANAGER: 'Quản lý',
    ADMIN: 'Quản trị viên'
  }

  return (
    <div className="user-management-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Quản lý người dùng</h1>
        </div>
      </header>

      <div className="management-container">
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Tìm kiếm người dùng..." />
          </div>
          <button className="btn btn-primary">
            <Users size={20} />
            Thêm người dùng
          </button>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="role-badge">
                    <Shield size={14} />
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${user.status.toLowerCase()}`}>
                    {user.status === 'ACTIVE' ? 'Hoạt động' : 'Khóa'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Chỉnh sửa">
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon btn-danger" title="Xóa">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
