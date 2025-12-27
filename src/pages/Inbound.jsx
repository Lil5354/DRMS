import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Package, Plus, Search } from 'lucide-react'
import '../styles/Inbound.css'

function Inbound() {
  const [items, setItems] = useState([
    { id: 1, name: 'Gạo', quantity: 500, unit: 'kg', donor: 'Công ty A', date: '15/12/2025' },
    { id: 2, name: 'Nước uống', quantity: 200, unit: 'lít', donor: 'Nhà hảo tâm B', date: '15/12/2025' }
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    donor: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      id: items.length + 1,
      ...formData,
      date: new Date().toLocaleDateString('vi-VN')
    }
    setItems([newItem, ...items])
    setFormData({ name: '', quantity: '', unit: 'kg', donor: '' })
    setShowForm(false)
    alert('Đã nhập kho thành công!')
  }

  return (
    <div className="inbound-page">
      <header className="header">
        <div className="header-content">
          <Link to="/map" className="back-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1>Quản lý nhập kho</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <Plus size={20} />
            Nhập kho
          </button>
        </div>
      </header>

      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <h2>Nhập hàng mới</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên hàng</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Đơn vị</label>
                  <select value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}>
                    <option value="kg">kg</option>
                    <option value="lít">lít</option>
                    <option value="thùng">thùng</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Nhà tài trợ</label>
                <input
                  type="text"
                  value={formData.donor}
                  onChange={(e) => setFormData({...formData, donor: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="inventory-list">
        <div className="list-header">
          <h2>Danh sách hàng trong kho</h2>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Tìm kiếm..." />
          </div>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Tên hàng</th>
              <th>Số lượng</th>
              <th>Nhà tài trợ</th>
              <th>Ngày nhập</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <Package size={16} />
                  {item.name}
                </td>
                <td>{item.quantity} {item.unit}</td>
                <td>{item.donor}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inbound
