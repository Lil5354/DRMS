import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Settings, FileText, Database, Bell } from 'lucide-react'
import '../styles/SystemConfig.css'

function SystemConfig() {
  const [logs] = useState([
    { id: 1, time: '15/12/2025 16:30', user: 'admin@floodlink.vn', action: 'Cập nhật cấu hình hệ thống', level: 'INFO' },
    { id: 2, time: '15/12/2025 14:20', user: 'manager@floodlink.vn', action: 'Tạo vận đơn mới #12345', level: 'INFO' },
    { id: 3, time: '15/12/2025 10:15', user: 'system', action: 'Lỗi kết nối database', level: 'ERROR' }
  ])

  return (
    <div className="system-config-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Cấu hình hệ thống</h1>
        </div>
      </header>

      <div className="config-container">
        <div className="config-section">
          <h2>
            <Settings size={24} />
            Cài đặt chung
          </h2>
          <div className="config-item">
            <label>Tên hệ thống</label>
            <input type="text" defaultValue="FloodLink" />
          </div>
          <div className="config-item">
            <label>Email liên hệ</label>
            <input type="email" defaultValue="support@floodlink.vn" />
          </div>
          <div className="config-item">
            <label>
              <Bell size={18} />
              Thông báo tự động
            </label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

        <div className="config-section">
          <h2>
            <Database size={24} />
            Cơ sở dữ liệu
          </h2>
          <div className="config-item">
            <label>Trạng thái kết nối</label>
            <span className="status-badge status-active">Đang kết nối</span>
          </div>
          <div className="config-item">
            <label>Số bản ghi</label>
            <span>1,234 yêu cầu</span>
          </div>
          <button className="btn btn-secondary">Sao lưu dữ liệu</button>
        </div>

        <div className="config-section">
          <h2>
            <FileText size={24} />
            Nhật ký hệ thống
          </h2>
          <div className="logs-container">
            {logs.map(log => (
              <div key={log.id} className={`log-item log-${log.level.toLowerCase()}`}>
                <div className="log-time">{log.time}</div>
                <div className="log-content">
                  <span className="log-user">{log.user}</span>
                  <span className="log-action">{log.action}</span>
                </div>
                <span className={`log-level level-${log.level.toLowerCase()}`}>{log.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="config-actions">
          <button className="btn btn-primary">Lưu cấu hình</button>
        </div>
      </div>
    </div>
  )
}

export default SystemConfig
