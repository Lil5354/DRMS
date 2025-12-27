import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react'
import '../styles/Notifications.css'

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Giao hàng thành công', message: 'Đơn hàng #12345 đã được giao thành công', time: '5 phút trước', read: false },
    { id: 2, type: 'warning', title: 'Yêu cầu mới', message: 'Có yêu cầu cứu trợ khẩn cấp từ Quận Hoàn Kiếm', time: '1 giờ trước', read: false },
    { id: 3, type: 'info', title: 'Cập nhật hệ thống', message: 'Hệ thống đã được cập nhật phiên bản mới', time: '2 giờ trước', read: true },
    { id: 4, type: 'success', title: 'Ứng trợ mới', message: 'Công ty A đã đăng ký ứng trợ 100kg gạo', time: '3 giờ trước', read: true },
    { id: 5, type: 'warning', title: 'Lịch vận chuyển', message: 'Bạn có lịch vận chuyển vào 14:00 hôm nay', time: '4 giờ trước', read: true }
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={20} />
      case 'warning': return <AlertCircle size={20} />
      case 'info': return <Info size={20} />
      default: return <Bell size={20} />
    }
  }

  return (
    <div className="notifications-page">
      <header className="header">
        <div className="header-content">
          <Link to="/dashboard" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <div className="header-title">
            <h1>Thông báo</h1>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={markAllAsRead}>
              Đánh dấu đã đọc
            </button>
          )}
        </div>
      </header>

      <div className="notifications-container">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <Bell size={48} />
            <p>Không có thông báo nào</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notif => (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'} ${notif.type}`}
                onClick={() => !notif.read && markAsRead(notif.id)}
              >
                <div className="notification-icon">
                  {getIcon(notif.type)}
                </div>
                <div className="notification-content">
                  <h3>{notif.title}</h3>
                  <p>{notif.message}</p>
                  <span className="notification-time">{notif.time}</span>
                </div>
                <button 
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(notif.id)
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
