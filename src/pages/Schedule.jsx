import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Truck, MapPin } from 'lucide-react'
import '../styles/Schedule.css'

function Schedule() {
  const [schedules] = useState([
    { id: 1, date: '16/12/2025', time: '09:00', destination: 'Quận Hoàn Kiếm', driver: 'Nguyễn Văn A', status: 'PENDING' },
    { id: 2, date: '16/12/2025', time: '14:00', destination: 'Quận Ba Đình', driver: 'Trần Văn B', status: 'CONFIRMED' },
    { id: 3, date: '17/12/2025', time: '10:00', destination: 'Quận Đống Đa', driver: 'Chưa phân', status: 'PENDING' }
  ])

  return (
    <div className="schedule-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Lịch vận chuyển</h1>
        </div>
      </header>

      <div className="schedule-container">
        <div className="schedule-stats">
          <div className="stat-card">
            <span className="stat-number">{schedules.length}</span>
            <span className="stat-label">Tổng chuyến</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{schedules.filter(s => s.status === 'PENDING').length}</span>
            <span className="stat-label">Chờ xác nhận</span>
          </div>
        </div>

        <div className="schedule-list">
          {schedules.map(schedule => (
            <div key={schedule.id} className="schedule-card">
              <div className="schedule-header">
                <div className="schedule-date">
                  <Calendar size={20} />
                  <span>{schedule.date} - {schedule.time}</span>
                </div>
                <span className={`status-badge status-${schedule.status.toLowerCase()}`}>
                  {schedule.status === 'PENDING' ? 'Chờ xác nhận' : 'Đã xác nhận'}
                </span>
              </div>
              <div className="schedule-info">
                <div className="info-row">
                  <MapPin size={16} />
                  <span>{schedule.destination}</span>
                </div>
                <div className="info-row">
                  <Truck size={16} />
                  <span>Tài xế: {schedule.driver}</span>
                </div>
              </div>
              <Link to={`/shipment/${schedule.id}`} className="btn btn-sm btn-primary">
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Schedule
