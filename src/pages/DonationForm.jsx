import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Package, Plus, Minus, ArrowLeft, CheckCircle, User, Phone, 
  Mail, MapPin, Truck, Calendar, Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { useToast } from '../components/ui/toast'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function DonationForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  useScrollAnimation()

  const selectedWarehouse = location.state?.warehouse || null

  const [formData, setFormData] = useState({
    donorName: '',
    donorPhone: '',
    donorEmail: '',
    donorAddress: '',
    targetWarehouseId: selectedWarehouse?.id || '',
    deliveryMethod: 'SELF_DELIVERY', // SELF_DELIVERY, PICKUP_REQUEST
    preferredDate: '',
    preferredTime: '',
    notes: '',
    items: [
      { name: 'Gạo', quantity: '', unit: 'kg' }
    ]
  })

  const itemTemplates = [
    { name: 'Gạo', unit: 'kg' },
    { name: 'Nước uống', unit: 'thùng' },
    { name: 'Mì tôm', unit: 'thùng' },
    { name: 'Thuốc men', unit: 'hộp' },
    { name: 'Quần áo', unit: 'bộ' },
    { name: 'Chăn màn', unit: 'cái' },
    { name: 'Đồ dùng học tập', unit: 'bộ' },
    { name: 'Đồ vệ sinh', unit: 'bộ' }
  ]

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: '', unit: 'kg' }]
    })
  }

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index)
      })
    }
  }

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items]
    newItems[index][field] = value
    setFormData({ ...formData, items: newItems })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate
    if (!formData.targetWarehouseId) {
      toast.error('Vui lòng chọn điểm tập kết')
      return
    }

    const hasEmptyItems = formData.items.some(item => !item.name || !item.quantity)
    if (hasEmptyItems) {
      toast.error('Vui lòng điền đầy đủ thông tin vật phẩm')
      return
    }

    // Generate tracking code
    const trackingCode = 'TRK' + Date.now().toString().slice(-6)
    
    // Create donation object
    const donation = {
      id: 'don-' + Date.now(),
      ...formData,
      trackingCode,
      status: 'REGISTERED',
      registeredAt: '2026-01-01T' + new Date().toTimeString().slice(0, 8) // Set to 2026-01-01 with current time
    }

    // Save to localStorage
    const existingDonations = JSON.parse(localStorage.getItem('donations') || '[]')
    existingDonations.push(donation)
    localStorage.setItem('donations', JSON.stringify(existingDonations))

    console.log('Donation registered:', donation)
    
    toast.success('Đăng ký quyên góp thành công! Mã tracking: ' + trackingCode, 5000)
    
    // Navigate to success page or back
    setTimeout(() => {
      navigate('/drms/donor', { 
        state: { 
          message: 'Đăng ký thành công! Vui lòng mang hàng đến điểm tập kết.',
          trackingCode 
        } 
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg animate-slide-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/drms/donor')}
              className="text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Đăng ký quyên góp</h1>
              <p className="text-sm text-red-100">Điền thông tin để gửi hàng cứu trợ</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Selected Warehouse */}
          {selectedWarehouse && (
            <Card className="mb-6 border-green-200 bg-green-50 scroll-scale">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-900 mb-2">Điểm tập kết đã chọn</h3>
                    <p className="text-sm font-semibold text-green-800">{selectedWarehouse.name}</p>
                    <p className="text-sm text-green-700">{selectedWarehouse.address}</p>
                    <p className="text-sm text-green-700 mt-1">
                      <Phone className="w-3 h-3 inline mr-1" />
                      {selectedWarehouse.phone} • {selectedWarehouse.openHours}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/drms/donor')}
                    className="hover:scale-105 transition-all duration-300"
                  >
                    Đổi điểm khác
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Info */}
            <Card className="scroll-animate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  Thông tin người quyên góp
                </CardTitle>
                <CardDescription>Thông tin liên hệ của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.donorName}
                      onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                      placeholder="Họ và tên của bạn"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.donorPhone}
                      onChange={(e) => setFormData({ ...formData, donorPhone: e.target.value })}
                      placeholder="Số điện thoại (10 số)"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.donorEmail}
                    onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                    placeholder="Email của bạn"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    value={formData.donorAddress}
                    onChange={(e) => setFormData({ ...formData, donorAddress: e.target.value })}
                    placeholder="Địa chỉ của bạn"
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card className="scroll-animate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" strokeWidth={1.5} />
                  Danh sách vật phẩm quyên góp
                </CardTitle>
                <CardDescription>Thêm các vật phẩm bạn muốn quyên góp</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Tên vật phẩm *
                        </label>
                        <select
                          required
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        >
                          <option value="">Chọn vật phẩm</option>
                          {itemTemplates.map(template => (
                            <option key={template.name} value={template.name}>
                              {template.name}
                            </option>
                          ))}
                          <option value="Khác">Khác (tự nhập)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Số lượng *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            placeholder="10"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Đơn vị
                          </label>
                          <select
                            value={item.unit}
                            onChange={(e) => updateItem(index, 'unit', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          >
                            <option value="kg">kg</option>
                            <option value="thùng">thùng</option>
                            <option value="hộp">hộp</option>
                            <option value="bộ">bộ</option>
                            <option value="cái">cái</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {formData.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="mt-6 hover:bg-red-50 hover:text-red-600 hover:scale-105 transition-all duration-300"
                      >
                        <Minus className="w-4 h-4" strokeWidth={1.5} />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="w-full hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Thêm vật phẩm
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card className="scroll-animate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" strokeWidth={1.5} />
                  Phương thức giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'SELF_DELIVERY' })}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:scale-105 ${
                      formData.deliveryMethod === 'SELF_DELIVERY'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold mb-2">Tự mang đến</h4>
                    <p className="text-sm text-gray-600">Bạn sẽ tự mang hàng đến điểm tập kết</p>
                  </div>
                  <div
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'PICKUP_REQUEST' })}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:scale-105 ${
                      formData.deliveryMethod === 'PICKUP_REQUEST'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold mb-2">Yêu cầu đến lấy</h4>
                    <p className="text-sm text-gray-600">Đội ngũ sẽ đến địa chỉ của bạn để lấy hàng</p>
                  </div>
                </div>

                {formData.deliveryMethod === 'SELF_DELIVERY' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
                        Ngày dự kiến
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
                        Giờ dự kiến
                      </label>
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Thông tin bổ sung (nếu có)"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/drms/donor')}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex-1 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <CheckCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Đăng ký quyên góp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DonationForm
