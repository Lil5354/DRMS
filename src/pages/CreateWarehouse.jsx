import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Building2, Package, Truck, Phone, Clock, ArrowLeft, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { useToast } from '../components/ui/toast'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function CreateWarehouse() {
  const navigate = useNavigate()
  const toast = useToast()
  useScrollAnimation()
  const [formData, setFormData] = useState({
    name: '',
    type: 'COLLECTION_POINT',
    address: '',
    phone: '',
    capacity: 500,
    openHours: '8:00 - 18:00',
    acceptedItems: []
  })

  const warehouseTypes = [
    { 
      id: 'CENTRAL_HUB', 
      label: 'Kho Tổng', 
      icon: Building2,
      description: 'Kho lớn, tiếp nhận và phân phối hàng hóa',
      color: 'from-red-600 to-red-500'
    },
    { 
      id: 'COLLECTION_POINT', 
      label: 'Điểm Gom Hàng', 
      icon: Package,
      description: 'Điểm tiếp nhận quyên góp từ cộng đồng',
      color: 'from-amber-600 to-amber-500'
    },
    { 
      id: 'DISTRIBUTION_POINT', 
      label: 'Điểm Phát', 
      icon: Truck,
      description: 'Điểm phát hàng cho người dân vùng lũ',
      color: 'from-blue-600 to-blue-500'
    }
  ]

  const itemOptions = [
    'Thực phẩm', 'Nước uống', 'Thuốc men', 'Quần áo', 
    'Chăn màn', 'Đồ dùng học tập', 'Đồ dùng vệ sinh'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit - In real app, this would call API
    toast.success('Đề xuất điểm tập kết đã được gửi! Admin sẽ xem xét và phê duyệt.')
    setTimeout(() => {
      navigate('/drms/donor')
    }, 1500)
  }

  const toggleItem = (item) => {
    setFormData(prev => ({
      ...prev,
      acceptedItems: prev.acceptedItems.includes(item)
        ? prev.acceptedItems.filter(i => i !== item)
        : [...prev.acceptedItems, item]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/drms/donor')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Đề xuất điểm tập kết mới</h1>
              <p className="text-sm text-red-100">Giúp mở rộng mạng lưới cứu trợ</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Info Banner */}
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Tại sao cần điểm tập kết?</h3>
                  <p className="text-sm text-blue-800">
                    Điểm tập kết giúp tập trung hàng hóa, tránh phân tán nguồn lực. 
                    Đề xuất của bạn sẽ được Admin xem xét và phê duyệt trong vòng 24h.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin điểm tập kết</CardTitle>
              <CardDescription>Vui lòng điền đầy đủ thông tin</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Warehouse Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Loại điểm tập kết
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {warehouseTypes.map(type => (
                      <div
                        key={type.id}
                        onClick={() => setFormData({ ...formData, type: type.id })}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                          formData.type === type.id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-3">
                          <type.icon className={`w-12 h-12 group-hover:scale-110 transition-transform duration-300 ${
                            type.id === 'CENTRAL_HUB' ? 'text-red-500' :
                            type.id === 'COLLECTION_POINT' ? 'text-amber-500' :
                            'text-blue-500'
                          }`} strokeWidth={1.5} />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{type.label}</h4>
                        <p className="text-xs text-gray-600">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên điểm tập kết *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Nhà văn hóa phường X, Trường THPT Y..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ chi tiết *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Số điện thoại liên hệ *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912345678"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Giờ hoạt động
                    </label>
                    <input
                      type="text"
                      value={formData.openHours}
                      onChange={(e) => setFormData({ ...formData, openHours: e.target.value })}
                      placeholder="8:00 - 18:00"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sức chứa ước tính (đơn vị)
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    min="100"
                    step="50"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ước tính số lượng lô hàng có thể chứa
                  </p>
                </div>

                {/* Accepted Items */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Loại hàng tiếp nhận
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {itemOptions.map(item => (
                      <Badge
                        key={item}
                        variant={formData.acceptedItems.includes(item) ? 'default' : 'outline'}
                        className={`cursor-pointer ${
                          formData.acceptedItems.includes(item) 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => toggleItem(item)}
                      >
                        {formData.acceptedItems.includes(item) && (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/drms/donor')}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Gửi đề xuất
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CreateWarehouse
