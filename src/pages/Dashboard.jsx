import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Map, List, AlertCircle, Package, Truck, Users, 
  Settings, QrCode, FileText, TrendingUp, Clock, CheckCircle 
} from 'lucide-react'
import '../styles/Dashboard.css'

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{"role":"VOLUNTEER"}')

  const stats = [
    { label: 'Yêu cầu chờ xử lý', value: 12, icon: Clock, color: '#f59e0b' },
    { label: 'Đang vận chuyển', value: 8, icon: Truck, color: '#3b82f6' },
    { label: 'Đã hoàn thành', value: 45, icon: CheckCircle, color: '#10b981' },
    { label: 'Tổng ứng trợ', value: 28, icon: Package, color: '#dc2626' }
  ]

  const quickActions = [
    { title: 'Xem bản đồ', icon: Map, link: '/map', color: '#dc2626' },
    { title: 'Gửi SOS', icon: AlertCircle, link: '/sos', color: '#ef4444' },
    { title: 'Danh sách yêu cầu', icon: List, link: '/requests', color: '#f59e0b' },
    { title: 'Đăng ký ứng trợ', icon: Package, link: '/offers/create', color: '#10b981' },
    { title: 'Tra cứu hàng', icon: FileText, link: '/traceability', color: '#3b82f6' },
    { title: 'Quản lý kho', icon: Package, link: '/inbound', color: '#8b5cf6' },
    { title: 'Lịch vận chuyển', icon: Truck, link: '/schedule', color: '#ec4899' },
    { title: 'Điểm danh QR', icon: QrCode, link: '/qr-checkin', color: '#06b6d4' }
  ]

  const recentActivities = [
    { id: 1, text: 'Yêu cầu mới từ Quận Hoàn Kiếm', time: '5 phút trước', type: 'request' },
    { id: 2, text: 'Đã giao hàng thành công #12345', time: '1 giờ trước', type: 'delivery' },
    { id: 3, text: 'Ứng trợ mới: 100kg gạo từ Công ty A', time: '2 giờ trước', type: 'offer' },
    { id: 4, text: 'Cập nhật trạng thái yêu cầu #12344', time: '3 giờ trước', type: 'update' }
  ]

  return (
    <div className="dashboard-page">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>Dashboard</h1>
            <p className="header-subtitle">Chào mừng trở lại, {user.email || 'User'}!</p>
          </div>
          <div className="header-actions">
            <Link to="/profile" className="btn btn-secondary">
              <Users size={20} />
              Hồ sơ
            </Link>
            <Link to="/config" className="btn btn-secondary">
              <Settings size={20} />
              Cài đặt
            </Link>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="quick-actions-section">
            <h2>
              <TrendingUp size={20} />
              Thao tác nhanh
            </h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <Link 
                  key={index} 
                  to={action.link} 
                  className="quick-action-card"
                  style={{ borderLeftColor: action.color }}
                >
                  <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                    <action.icon size={24} />
                  </div>
                  <span>{action.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="recent-activity-section">
            <h2>
              <Clock size={20} />
              Hoạt động gần đây
            </h2>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-dot ${activity.type}`}></div>
                  <div className="activity-content">
                    <p>{activity.text}</p>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/requests" className="view-all-link">
              Xem tất cả →
            </Link>
          </div>
        </div>

        <div className="map-preview-section">
          <h2>
            <Map size={20} />
            Bản đồ tổng quan
          </h2>
          <div className="map-preview-card">
            <p>Xem vị trí các yêu cầu cứu trợ trên bản đồ</p>
            <Link to="/map" className="btn btn-primary">
              Mở bản đồ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
