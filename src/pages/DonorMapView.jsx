import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { MapPin, Package, Phone, Clock, Navigation, Plus, AlertCircle, Building2, Truck } from 'lucide-react'
import L from 'leaflet'
import { warehouses, warehouseTypes, warehouseStatuses } from '../data/drms-mock'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useToast } from '../components/ui/toast'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const getIconSvg = (iconName) => {
  const icons = {
    Building2: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
    Package: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    Truck: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>'
  }
  return icons[iconName] || icons.Package
}

const createWarehouseIcon = (type, status) => {
  const typeInfo = warehouseTypes[type]
  const statusColor = status === 'OPEN' ? '#10b981' : status === 'FULL' ? '#ef4444' : '#6b7280'
  
  return L.divIcon({
    className: 'custom-warehouse-marker',
    html: `
      <div style="
        background: ${statusColor};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${getIconSvg(typeInfo.iconName)}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

function DonorMapView() {
  const navigate = useNavigate()
  const toast = useToast()
  const [userLocation] = useState({ lat: 21.0285, lng: 105.8542 })
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filterType, setFilterType] = useState('ALL')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    address: '',
    phone: '',
    description: ''
  })
  useScrollAnimation()

  // Tính khoảng cách (đơn giản hóa)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return (R * c).toFixed(1)
  }

  // Tìm điểm tập kết gần nhất
  const findNearestWarehouses = () => {
    const openWarehouses = warehouses
      .filter(w => w.status === 'OPEN')
      .map(w => ({
        ...w,
        distance: calculateDistance(
          userLocation.lat, userLocation.lng,
          w.location.lat, w.location.lng
        )
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5)
    
    return openWarehouses
  }

  const handleDonateClick = () => {
    const nearest = findNearestWarehouses()
    if (nearest.length > 0) {
      setShowSuggestions(true)
    } else {
      alert('Không tìm thấy điểm tập kết gần bạn. Bạn có muốn tạo điểm tập kết mới?')
    }
  }

  const filteredWarehouses = filterType === 'ALL' 
    ? warehouses 
    : warehouses.filter(w => w.type === filterType)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg animate-slide-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl font-bold">DRMS - Cứu Trợ Thiên Tai</h1>
                <p className="text-sm text-red-100">Hệ thống quản lý thiện nguyện</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleDonateClick}
                className="bg-white text-red-600 hover:bg-red-50 font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                size="lg"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Tôi muốn ủng hộ
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/drms/profile/edit')}
              >
                Tài khoản
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                onClick={() => {
                  toast.success('Đăng xuất thành công!')
                  setTimeout(() => {
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                  }, 1000)
                }}
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white border-b shadow-sm animate-fade-in">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Loại điểm:</span>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('ALL')}
                className="hover:scale-105 transition-all duration-300"
              >
                Tất cả
              </Button>
              <Button
                variant={filterType === 'CENTRAL_HUB' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('CENTRAL_HUB')}
                className="hover:scale-105 transition-all duration-300"
              >
                <Building2 className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Kho Tổng
              </Button>
              <Button
                variant={filterType === 'COLLECTION_POINT' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('COLLECTION_POINT')}
                className="hover:scale-105 transition-all duration-300"
              >
                <Package className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Điểm Gom
              </Button>
              <Button
                variant={filterType === 'DISTRIBUTION_POINT' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('DISTRIBUTION_POINT')}
                className="hover:scale-105 transition-all duration-300"
              >
                <Truck className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Điểm Phát
              </Button>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {warehouses.filter(w => w.status === 'OPEN').length} Đang mở
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {warehouses.filter(w => w.status === 'FULL').length} Đã đầy
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User Location */}
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={100}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.3 }}
          />
          
          {/* Warehouses */}
          {filteredWarehouses.map((warehouse) => (
            <Marker
              key={warehouse.id}
              position={[warehouse.location.lat, warehouse.location.lng]}
              icon={createWarehouseIcon(warehouse.type, warehouse.status)}
              eventHandlers={{
                click: () => setSelectedWarehouse(warehouse)
              }}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{warehouse.name}</h3>
                    <Badge 
                      variant={warehouse.status === 'OPEN' ? 'default' : 'destructive'}
                      className={warehouse.status === 'OPEN' ? 'bg-green-500' : ''}
                    >
                      {warehouseStatuses[warehouse.status].label}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{warehouse.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{warehouse.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{warehouse.openHours}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Tiếp nhận:</p>
                      <div className="flex flex-wrap gap-1">
                        {warehouse.acceptedItems.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <div className="flex justify-between text-xs">
                        <span>Sức chứa:</span>
                        <span className="font-semibold">
                          {warehouse.currentLoad}/{warehouse.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            warehouse.currentLoad / warehouse.capacity > 0.8 
                              ? 'bg-red-500' 
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${(warehouse.currentLoad / warehouse.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {warehouse.status === 'OPEN' && (
                    <Button 
                      className="w-full mt-3" 
                      size="sm"
                      onClick={() => navigate('/drms/donation/create', { state: { warehouse } })}
                    >
                      <Navigation className="w-4 h-4" />
                      Chọn điểm này
                    </Button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Suggestions Panel */}
        {showSuggestions && (
          <div className="absolute top-4 right-4 w-96 max-h-[80vh] overflow-auto z-[1000]">
            <Card className="shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Điểm tập kết gần bạn</span>
                  <button 
                    onClick={() => setShowSuggestions(false)}
                    className="text-white hover:text-red-100"
                  >
                    ✕
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {findNearestWarehouses().map((warehouse, idx) => {
                    const IconComponent = warehouse.type === 'CENTRAL_HUB' ? Building2 : 
                                         warehouse.type === 'COLLECTION_POINT' ? Package : Truck
                    return (
                      <Card key={warehouse.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 animate-scale-in">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="font-semibold text-sm">{warehouse.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {warehouse.distance} km
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{warehouse.address}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {warehouse.openHours}
                              </div>
                              <Button 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={() => navigate('/drms/donation/create', { state: { warehouse } })}
                              >
                                Đăng ký gửi hàng
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div className="text-xs text-amber-800">
                      <p className="font-semibold mb-1">Không tìm thấy điểm phù hợp?</p>
                      <p>Bạn có thể đề xuất tạo điểm tập kết mới tại khu vực của mình.</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => window.location.href = '/drms/warehouse/create'}
                      >
                        Đề xuất điểm tập kết
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonorMapView
