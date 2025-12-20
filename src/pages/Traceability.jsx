import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react'
import '../styles/Traceability.css'

function Traceability() {
  const [searchId, setSearchId] = useState('')
  const [result, setResult] = useState(null)

  const mockData = {
    '12345': {
      id: '12345',
      requester: 'Nguyễn Văn A',
      items: ['Gạo 50kg', 'Nước uống 20 lít'],
      status: 'DELIVERED',
      timeline: [
        { step: 'Yêu cầu tạo', time: '10:00 15/12/2025', status: 'completed' },
        { step: 'Đã nhập kho', time: '11:30 15/12/2025', status: 'completed' },
        { step: 'Đang vận chuyển', time: '14:00 15/12/2025', status: 'completed' },
        { step: 'Đã giao hàng', time: '16:30 15/12/2025', status: 'completed' }
      ]
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (mockData[searchId]) {
      setResult(mockData[searchId])
    } else {
      setResult({ notFound: true })
    }
  }

  return (
    <div className="traceability-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Tra cứu hàng cứu trợ</h1>
        </div>
      </header>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Nhập mã yêu cầu hoặc mã vận đơn"
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            <Search size={20} />
            Tra cứu
          </button>
        </form>
      </div>

      {result && (
        <div className="result-container">
          {result.notFound ? (
            <div className="not-found">
              <Package size={48} />
              <p>Không tìm thấy thông tin</p>
            </div>
          ) : (
            <div className="tracking-info">
              <div className="info-header">
                <h2>Mã: #{result.id}</h2>
                <span className="status-badge status-delivered">Đã giao</span>
              </div>

              <div className="info-section">
                <h3>Người nhận: {result.requester}</h3>
                <div className="items-list">
                  {result.items.map((item, idx) => (
                    <div key={idx} className="item">
                      <Package size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="timeline">
                <h3>Lịch sử vận chuyển</h3>
                {result.timeline.map((event, idx) => (
                  <div key={idx} className={`timeline-item ${event.status}`}>
                    <div className="timeline-icon">
                      {event.status === 'completed' ? <CheckCircle size={20} /> : <Clock size={20} />}
                    </div>
                    <div className="timeline-content">
                      <h4>{event.step}</h4>
                      <p>{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Traceability
