import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Users, Package, Truck, Download } from 'lucide-react'
import '../styles/Reports.css'

function Reports() {
  const stats = {
    totalRequests: 156,
    completedRequests: 98,
    activeVolunteers: 45,
    totalSupplies: 2500,
    deliveries: 87
  }

  const chartData = [
    { month: 'T1', requests: 20, completed: 15 },
    { month: 'T2', requests: 25, completed: 20 },
    { month: 'T3', requests: 30, completed: 25 },
    { month: 'T4', requests: 35, completed: 30 },
    { month: 'T5', requests: 46, completed: 38 }
  ]

  return (
    <div className="reports-page">
      <header className="header">
        <div className="header-content">
          <Link to="/dashboard" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Báo cáo & Thống kê</h1>
          <button className="btn btn-primary">
            <Download size={20} />
            Xuất báo cáo
          </button>
        </div>
      </header>

      <div className="reports-container">
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
              <TrendingUp size={32} />
            </div>
            <div className="summary-content">
              <h3>{stats.totalRequests}</h3>
              <p>Tổng yêu cầu</p>
              <span className="trend positive">+12% so với tháng trước</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
              <Package size={32} />
            </div>
            <div className="summary-content">
              <h3>{stats.completedRequests}</h3>
              <p>Đã hoàn thành</p>
              <span className="trend positive">+8% so với tháng trước</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: '#dbeafe', color: '#2563eb' }}>
              <Users size={32} />
            </div>
            <div className="summary-content">
              <h3>{stats.activeVolunteers}</h3>
              <p>Tình nguyện viên</p>
              <span className="trend positive">+5 người mới</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
              <Truck size={32} />
            </div>
            <div className="summary-content">
              <h3>{stats.deliveries}</h3>
              <p>Chuyến giao hàng</p>
              <span className="trend positive">+15% so với tháng trước</span>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h2>Biểu đồ yêu cầu theo tháng</h2>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.map((data, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="chart-bars-wrapper">
                    <div 
                      className="chart-bar requests"
                      style={{ height: `${(data.requests / 50) * 100}%` }}
                      title={`Yêu cầu: ${data.requests}`}
                    ></div>
                    <div 
                      className="chart-bar completed"
                      style={{ height: `${(data.completed / 50) * 100}%` }}
                      title={`Hoàn thành: ${data.completed}`}
                    ></div>
                  </div>
                  <span className="chart-label">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color requests"></span>
                <span>Yêu cầu</span>
              </div>
              <div className="legend-item">
                <span className="legend-color completed"></span>
                <span>Hoàn thành</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tables-grid">
          <div className="table-section">
            <h2>Top địa điểm yêu cầu</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Địa điểm</th>
                  <th>Số yêu cầu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quận Hoàn Kiếm</td>
                  <td><strong>45</strong></td>
                </tr>
                <tr>
                  <td>Quận Ba Đình</td>
                  <td><strong>38</strong></td>
                </tr>
                <tr>
                  <td>Quận Đống Đa</td>
                  <td><strong>32</strong></td>
                </tr>
                <tr>
                  <td>Quận Hai Bà Trưng</td>
                  <td><strong>28</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-section">
            <h2>Top nhà tài trợ</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Số lần ứng trợ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Công ty A</td>
                  <td><strong>15</strong></td>
                </tr>
                <tr>
                  <td>Nhà hảo tâm B</td>
                  <td><strong>12</strong></td>
                </tr>
                <tr>
                  <td>Tổ chức C</td>
                  <td><strong>10</strong></td>
                </tr>
                <tr>
                  <td>Công ty D</td>
                  <td><strong>8</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
