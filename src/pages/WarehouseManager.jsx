import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package, QrCode, TrendingUp, TrendingDown,
  CheckCircle, Clock, AlertCircle, Scan, Plus, Search,
  Filter, Download, Upload, Phone, Edit, Trash2, Save, MapPin, BarChart3
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog'
import { ConfirmDialog } from '../components/ui/confirm-dialog'
import { FilterDialog } from '../components/ui/filter-dialog'
import { donations, warehouses } from '../data/drms-mock'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useToast } from '../components/ui/toast'
import QRScanner from '../components/QRScanner'
import QRScannerInline from '../components/QRScannerInline'
import '../styles/QRScanner.css'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

function WarehouseManager() {
  const navigate = useNavigate()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedWarehouse] = useState(warehouses[0]) // Mock: manager quản lý kho đầu tiên
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditingDonation, setIsEditingDonation] = useState(false)
  const [donationStatusUpdate, setDonationStatusUpdate] = useState('REGISTERED')
  const [chartsVisible, setChartsVisible] = useState({
    bar: false,
    line: false
  })
  const [progressWidth, setProgressWidth] = useState(0)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [donationFilters, setDonationFilters] = useState({ status: 'ALL', dateFrom: '', dateTo: '' })
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newDonationForm, setNewDonationForm] = useState({
    donorName: '',
    donorPhone: '',
    items: [{ name: '', quantity: '', unit: 'kg' }]
  })
  const [qrSearchId, setQrSearchId] = useState('')
  
  const barChartRef = React.useRef(null)
  const lineChartRef = React.useRef(null)
  const progressRef = React.useRef(null)
  
  // Chart and progress visibility observer
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    }
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chartType = entry.target.dataset.chart
          if (chartType === 'progress') {
            // Animate progress bar
            const targetWidth = (selectedWarehouse.currentLoad / selectedWarehouse.capacity) * 100
            let currentWidth = 0
            const increment = targetWidth / 60 // 60 frames for smooth animation
            const animate = () => {
              currentWidth += increment
              if (currentWidth < targetWidth) {
                setProgressWidth(currentWidth)
                requestAnimationFrame(animate)
              } else {
                setProgressWidth(targetWidth)
              }
            }
            requestAnimationFrame(animate)
          } else {
            setChartsVisible(prev => ({ ...prev, [chartType]: true }))
          }
        }
      })
    }
    
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (barChartRef.current) observer.observe(barChartRef.current)
    if (lineChartRef.current) observer.observe(lineChartRef.current)
    if (progressRef.current) observer.observe(progressRef.current)
    
    return () => observer.disconnect()
  }, [activeTab, selectedWarehouse])
  
  // Reset charts and progress when switching tabs
  React.useEffect(() => {
    setChartsVisible({ bar: false, line: false })
    setProgressWidth(0)
  }, [activeTab])
  
  // Re-trigger scroll animations when tab changes
  React.useEffect(() => {
    // Remove visible class from all animated elements
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-fade-left, .scroll-fade-right, .scroll-scale')
    animatedElements.forEach(el => el.classList.remove('visible'))
    
    // Setup new observer for current tab
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Re-observe after a short delay to let DOM update
    setTimeout(() => {
      const newAnimatedElements = document.querySelectorAll('.scroll-animate, .scroll-fade-left, .scroll-fade-right, .scroll-scale')
      newAnimatedElements.forEach(el => {
        observer.observe(el)
        // Immediately add visible class if already in viewport
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        }
      })
    }, 100)

    return () => observer.disconnect()
  }, [activeTab])
  
  // Smooth tab transition
  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsTransitioning(false)
    }, 150)
  }
  
  useScrollAnimation()

  const warehouseDonations = donations.filter(d => d.targetWarehouseId === selectedWarehouse.id)
  
  // Filtered donations
  const filteredDonations = warehouseDonations.filter(d => {
    if (donationFilters.status !== 'ALL' && d.status !== donationFilters.status) return false
    if (donationFilters.dateFrom && new Date(d.registeredAt) < new Date(donationFilters.dateFrom)) return false
    if (donationFilters.dateTo && new Date(d.registeredAt) > new Date(donationFilters.dateTo)) return false
    return true
  })

  const stats = [
    {
      title: 'Hàng chờ nhận',
      value: warehouseDonations.filter(d => d.status === 'REGISTERED').length,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      trend: '+3'
    },
    {
      title: 'Đã nhập kho',
      value: warehouseDonations.filter(d => d.status === 'RECEIVED').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+12'
    },
    {
      title: 'Đã phát',
      value: warehouseDonations.filter(d => d.status === 'DISTRIBUTED').length,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+8'
    },
    {
      title: 'Sức chứa',
      value: `${selectedWarehouse.currentLoad}/${selectedWarehouse.capacity}`,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '65%'
    }
  ]

  const pendingDonations = filteredDonations.filter(d => d.status === 'REGISTERED')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10 animate-slide-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-blue-500 hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý kho</h1>
                <p className="text-sm text-gray-500">{selectedWarehouse.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-all duration-300">
                <Download className="w-4 h-4" strokeWidth={1.5} />
                Xuất báo cáo
              </Button>
              <div 
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate('/drms/profile/edit')}
              >
                <Package className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                <span className="text-sm font-medium">{selectedWarehouse.manager}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:scale-105 transition-all duration-300"
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

      {/* Warehouse Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Địa chỉ</p>
              <p className="font-semibold">{selectedWarehouse.address}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Giờ mở cửa</p>
              <p className="font-semibold">{selectedWarehouse.openHours}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Liên hệ</p>
              <p className="font-semibold">{selectedWarehouse.phone}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Trạng thái</p>
              <Badge className="bg-white text-blue-600 hover:bg-white">
                {selectedWarehouse.status === 'OPEN' ? 'Đang hoạt động' : 'Đã đầy'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
              { id: 'inbound', label: 'Nhập kho', icon: Upload },
              { id: 'inventory', label: 'Tồn kho', icon: Package },
              { id: 'outbound', label: 'Xuất kho', icon: TrendingDown },
              { id: 'qr-scan', label: 'Quét QR', icon: QrCode }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-xs text-green-600 font-semibold">↑ {stat.trend} hôm nay</p>
                      </div>
                      <stat.icon className={`w-12 h-12 ${stat.color} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inbound Trends */}
              <Card className="scroll-fade-left" ref={barChartRef} data-chart="bar">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Xu hướng nhập kho
                  </CardTitle>
                  <CardDescription>7 ngày gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  {chartsVisible.bar && (
                    <Bar
                      data={{
                        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                        datasets: [
                          {
                            label: 'Lô hàng nhập',
                            data: [8, 12, 10, 15, 18, 14, 16],
                            backgroundColor: 'rgba(59, 130, 246, 0.8)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 2,
                            borderRadius: 8,
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 2,
                        animation: {
                          duration: 2000,
                          easing: 'easeInOutQuart',
                          delay: (context) => context.dataIndex * 100,
                          y: {
                            duration: 2000,
                            from: 0,
                            easing: 'easeInOutQuart'
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          },
                          tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            borderRadius: 8,
                            titleFont: { size: 14, weight: 'bold' },
                            bodyFont: { size: 13 }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                              font: { size: 12 }
                            }
                          },
                          x: {
                            grid: {
                              display: false
                            },
                            ticks: {
                              font: { size: 12 }
                            }
                          }
                        }
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Capacity Progress */}
              <Card className="scroll-fade-right" ref={progressRef} data-chart="progress">
                <CardHeader>
                  <CardTitle>Sức chứa kho</CardTitle>
                  <CardDescription>Tình trạng sử dụng không gian</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Đã sử dụng</span>
                      <span className="font-semibold">{selectedWarehouse.currentLoad} / {selectedWarehouse.capacity} đơn vị</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-1000 ${
                          selectedWarehouse.currentLoad / selectedWarehouse.capacity > 0.8 
                            ? 'bg-red-500' 
                            : selectedWarehouse.currentLoad / selectedWarehouse.capacity > 0.6
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    
                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{warehouseDonations.filter(d => d.status === 'RECEIVED').length}</p>
                        <p className="text-xs text-gray-600 mt-1">Đã nhận</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">{warehouseDonations.filter(d => d.status === 'REGISTERED').length}</p>
                        <p className="text-xs text-gray-600 mt-1">Chờ nhận</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{warehouseDonations.filter(d => d.status === 'DISTRIBUTED').length}</p>
                        <p className="text-xs text-gray-600 mt-1">Đã phát</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="lg:col-span-2 scroll-scale" ref={lineChartRef} data-chart="line">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Hoạt động kho theo thời gian
                  </CardTitle>
                  <CardDescription>30 ngày gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  {chartsVisible.line && (
                    <Line
                      data={{
                        labels: ['1/12', '5/12', '10/12', '15/12', '20/12', '25/12', '30/12'],
                        datasets: [
                          {
                            label: 'Nhập kho',
                            data: [25, 32, 28, 45, 50, 55, 60],
                            borderColor: 'rgba(34, 197, 94, 1)',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                          },
                          {
                            label: 'Xuất kho',
                            data: [18, 22, 20, 35, 38, 42, 48],
                            borderColor: 'rgba(239, 68, 68, 1)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 3,
                        animation: {
                          duration: 2000,
                          easing: 'easeInOutQuart',
                          delay: (context) => {
                            if (context.type === 'data' && context.mode === 'default') {
                              return context.dataIndex * 50 + context.datasetIndex * 100
                            }
                            return 0
                          },
                          y: {
                            duration: 2000,
                            from: 0,
                            easing: 'easeInOutQuart'
                          }
                        },
                        interaction: {
                          mode: 'index',
                          intersect: false,
                        },
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              padding: 15,
                              font: { size: 13 },
                              usePointStyle: true,
                              pointStyle: 'circle'
                            }
                          },
                          tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            borderRadius: 8,
                            titleFont: { size: 14, weight: 'bold' },
                            bodyFont: { size: 13 }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                              font: { size: 12 }
                            }
                          },
                          x: {
                            grid: {
                              display: false
                            },
                            ticks: {
                              font: { size: 12 }
                            }
                          }
                        }
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <Card className="scroll-scale">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Lô hàng gần đây</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                    Lọc
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {warehouseDonations.map(donation => (
                    <div 
                      key={donation.id} 
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
                      onClick={() => {
                        setSelectedDonation(donation)
                        setShowDonationDialog(true)
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{donation.donorName}</h4>
                          <Badge 
                            variant={
                              donation.status === 'REGISTERED' ? 'default' :
                              donation.status === 'RECEIVED' ? 'secondary' :
                              'outline'
                            }
                            className={
                              donation.status === 'REGISTERED' ? 'bg-amber-500' :
                              donation.status === 'RECEIVED' ? 'bg-green-500' :
                              'bg-blue-500 text-white'
                            }
                          >
                            {donation.status === 'REGISTERED' ? 'Chờ nhận' :
                             donation.status === 'RECEIVED' ? 'Đã nhận' :
                             'Đã phát'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {donation.items.map((item, idx) => (
                            <span key={idx} className="text-xs bg-white px-2 py-1 rounded border">
                              {item.name}: {item.quantity} {item.unit}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {donation.donorPhone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {donation.trackingCode}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(donation.registeredAt).toLocaleString('vi-VN')}
                          </span>
                        </div>
                      </div>
                      {donation.status === 'REGISTERED' && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            toast.success('Đã xác nhận nhận hàng thành công!')
                            // Mock update status - In real app, call API here
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Xác nhận nhận
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'qr-scan' && (
          <div className="max-w-2xl mx-auto">
            <Card className="scroll-scale">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quét mã QR</CardTitle>
                <CardDescription>Quét mã QR trên phiếu gửi hàng để nhập kho nhanh</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300"
                  style={{
                    transition: 'all 0.3s ease',
                    aspectRatio: '1',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <QRScannerInline 
                    onScan={(decodedText) => {
                      console.log('QR scanned:', decodedText)
                      setQrSearchId(decodedText)
                      
                      // Search for donation with this tracking code
                      const donation = warehouseDonations.find(d => d.trackingCode === decodedText)
                      if (donation) {
                        setSelectedDonation(donation)
                        setShowDonationDialog(true)
                        toast.success('Tìm thấy lô hàng: ' + decodedText)
                      } else {
                        toast.error('Không tìm thấy mã tracking: ' + decodedText)
                      }
                    }}
                    onError={(error) => {
                      toast.error(error)
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">Hoặc nhập mã thủ công</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={qrSearchId}
                      onChange={(e) => setQrSearchId(e.target.value)}
                      placeholder="Nhập mã tracking (VD: TRK001234)"
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ transition: 'all 0.2s ease' }}
                    />
                    <Button onClick={() => {
                      if (qrSearchId.trim()) {
                        const donation = warehouseDonations.find(d => d.trackingCode === qrSearchId)
                        if (donation) {
                          setSelectedDonation(donation)
                          setShowDonationDialog(true)
                          toast.success('Tìm thấy lô hàng!')
                        } else {
                          toast.error('Không tìm thấy mã tracking này')
                        }
                      }
                    }}>
                      <Search className="w-4 h-4" />
                      Tìm
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Hướng dẫn
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Yêu cầu người quyên góp xuất trình mã QR trên điện thoại</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Quét mã để tự động điền thông tin lô hàng</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Kiểm tra và xác nhận nhập kho</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'inbound' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Danh sách chờ nhập kho</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowFilterDialog(true)}
                >
                  <Filter className="w-4 h-4" />
                  Lọc {Object.values(donationFilters).filter(v => v && v !== 'ALL').length > 0 && `(${Object.values(donationFilters).filter(v => v && v !== 'ALL').length})`}
                </Button>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="w-4 h-4" />
                  Thêm thủ công
                </Button>
              </div>
            </div>

            {pendingDonations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Không có lô hàng chờ nhận</h3>
                  <p className="text-sm text-gray-500">Tất cả lô hàng đã được xử lý</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingDonations.map(donation => (
                  <Card 
                    key={donation.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedDonation(donation)
                      setShowDonationDialog(true)
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{donation.donorName}</h3>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {donation.donorPhone}
                              </p>
                            </div>
                            <Badge className="bg-amber-500">Chờ nhận</Badge>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              Danh sách vật phẩm:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {donation.items.map((item, idx) => (
                                <div key={idx} className="bg-gray-50 px-3 py-2 rounded border">
                                  <p className="font-semibold text-sm">{item.name}</p>
                                  <p className="text-xs text-gray-600">{item.quantity} {item.unit}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500 flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                {donation.trackingCode}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(donation.registeredAt).toLocaleString('vi-VN')}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <QrCode className="w-4 h-4" />
                                Quét QR
                              </Button>
                              <Button size="sm">
                                <CheckCircle className="w-4 h-4" />
                                Xác nhận nhận hàng
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tồn kho hiện tại</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowFilterDialog(true)}
                >
                  <Filter className="w-4 h-4" />
                  Lọc {Object.values(donationFilters).filter(v => v && v !== 'ALL').length > 0 && `(${Object.values(donationFilters).filter(v => v && v !== 'ALL').length})`}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info('Chức năng xuất Excel đang phát triển')}
                >
                  <Download className="w-4 h-4" />
                  Xuất Excel
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonations.filter(d => d.status === 'RECEIVED').map(donation => (
                <Card 
                  key={donation.id} 
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setSelectedDonation(donation)
                    setShowDonationDialog(true)
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-green-600" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{donation.donorName}</h3>
                        <Badge className="bg-green-500 mb-3">Đã nhập kho</Badge>
                        
                        <div className="space-y-2">
                          <p className="text-xs text-gray-600">
                            <strong>Mã:</strong> {donation.trackingCode}
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Số lượng:</strong> {donation.items.length} loại vật phẩm
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Nhập lúc:</strong> {new Date(donation.receivedAt || donation.registeredAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDonations.filter(d => d.status === 'RECEIVED').length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Kho trống</h3>
                  <p className="text-sm text-gray-500">Chưa có lô hàng nào trong kho</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'outbound' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Lịch sử xuất kho</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowFilterDialog(true)}
                >
                  <Filter className="w-4 h-4" />
                  Lọc {Object.values(donationFilters).filter(v => v && v !== 'ALL').length > 0 && `(${Object.values(donationFilters).filter(v => v && v !== 'ALL').length})`}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info('Chức năng xuất báo cáo đang phát triển')}
                >
                  <Download className="w-4 h-4" />
                  Xuất báo cáo
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredDonations.filter(d => d.status === 'DISTRIBUTED').map(donation => (
                <Card 
                  key={donation.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedDonation(donation)
                    setShowDonationDialog(true)
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{donation.donorName}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Phone className="w-3 h-3" />
                              {donation.donorPhone}
                            </p>
                          </div>
                          <Badge className="bg-blue-500">Đã phát</Badge>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Danh sách vật phẩm:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {donation.items.map((item, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 px-3 py-1 rounded-full border">
                                {item.name}: {item.quantity} {item.unit}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {donation.trackingCode}
                            </span>
                            <span>•</span>
                            <span>Xuất lúc: {new Date(donation.distributedAt || donation.registeredAt).toLocaleString('vi-VN')}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDonations.filter(d => d.status === 'DISTRIBUTED').length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <TrendingDown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Chưa có lịch sử xuất kho</h3>
                  <p className="text-sm text-gray-500">Chưa có lô hàng nào được phát</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Donation Detail Dialog */}
      <Dialog open={showDonationDialog} onClose={() => {
        setShowDonationDialog(false)
        setIsEditingDonation(false)
      }}>
        <DialogHeader onClose={() => {
          setShowDonationDialog(false)
          setIsEditingDonation(false)
        }}>
          <DialogTitle>
            {isEditingDonation ? 'Cập nhật trạng thái' : 'Chi tiết lô hàng'}
          </DialogTitle>
          <DialogDescription>Mã tracking: {selectedDonation?.trackingCode}</DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedDonation && !isEditingDonation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Người quyên góp</label>
                  <p className="text-sm mt-1">{selectedDonation.donorName}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Số điện thoại</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-sm">{selectedDonation.donorPhone}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Danh sách vật phẩm</label>
                <div className="space-y-2">
                  {selectedDonation.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">{item.quantity} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">Trạng thái hiện tại</label>
                <Badge className={`mt-1 ${
                  selectedDonation.status === 'REGISTERED' ? 'bg-amber-500' :
                  selectedDonation.status === 'RECEIVED' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {selectedDonation.status === 'REGISTERED' ? 'Chờ nhận' :
                   selectedDonation.status === 'RECEIVED' ? 'Đã nhận' : 'Đã phát'}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">Thời gian đăng ký</label>
                <p className="text-sm mt-1">{new Date(selectedDonation.registeredAt).toLocaleString('vi-VN')}</p>
              </div>
            </div>
          )}
          
          {isEditingDonation && selectedDonation && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cập nhật trạng thái
                </label>
                <select
                  value={donationStatusUpdate}
                  onChange={(e) => setDonationStatusUpdate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="REGISTERED">Chờ nhận</option>
                  <option value="RECEIVED">Đã nhận</option>
                  <option value="DISTRIBUTED">Đã phát</option>
                </select>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Thay đổi trạng thái sẽ cập nhật hệ thống và thông báo cho người quyên góp.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          {!isEditingDonation ? (
            <>
              <Button 
                variant="outline"
                className="hover:bg-red-50 hover:text-red-600"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa
              </Button>
              <Button variant="outline" onClick={() => setShowDonationDialog(false)}>Đóng</Button>
              <Button onClick={() => {
                setIsEditingDonation(true)
                setDonationStatusUpdate(selectedDonation?.status || 'REGISTERED')
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Cập nhật trạng thái
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditingDonation(false)}>Hủy</Button>
              <Button onClick={() => {
                toast.success('Cập nhật trạng thái thành công!')
                setShowDonationDialog(false)
                setIsEditingDonation(false)
              }}>
                <Save className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          toast.success('Đã xóa lô hàng thành công!')
          setShowDonationDialog(false)
          setSelectedDonation(null)
          setShowDeleteConfirm(false)
        }}
        title="Xóa lô hàng"
        description={`Bạn có chắc chắn muốn xóa lô hàng của "${selectedDonation?.donorName}"?`}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />

      {/* Filter Dialog */}
      <FilterDialog
        open={showFilterDialog}
        onClose={() => setShowFilterDialog(false)}
        type="donation"
        filters={donationFilters}
        onFilterChange={setDonationFilters}
        onApply={() => {
          toast.success('Đã áp dụng bộ lọc!')
        }}
      />

      {/* Add Donation Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogHeader onClose={() => setShowAddDialog(false)}>
          <DialogTitle>Thêm lô hàng thủ công</DialogTitle>
          <DialogDescription>Nhập thông tin lô hàng quyên góp</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên người quyên góp *
                </label>
                <input
                  type="text"
                  required
                  value={newDonationForm.donorName}
                  onChange={(e) => setNewDonationForm({ ...newDonationForm, donorName: e.target.value })}
                  placeholder="Họ và tên người quyên góp"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  value={newDonationForm.donorPhone}
                  onChange={(e) => setNewDonationForm({ ...newDonationForm, donorPhone: e.target.value })}
                  placeholder="Số điện thoại (10 số)"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Danh sách vật phẩm
              </label>
              <div className="space-y-2">
                {newDonationForm.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tên vật phẩm"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...newDonationForm.items]
                        newItems[idx].name = e.target.value
                        setNewDonationForm({ ...newDonationForm, items: newItems })
                      }}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Số lượng"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...newDonationForm.items]
                        newItems[idx].quantity = e.target.value
                        setNewDonationForm({ ...newDonationForm, items: newItems })
                      }}
                      className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={item.unit}
                      onChange={(e) => {
                        const newItems = [...newDonationForm.items]
                        newItems[idx].unit = e.target.value
                        setNewDonationForm({ ...newDonationForm, items: newItems })
                      }}
                      className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="kg">kg</option>
                      <option value="thùng">thùng</option>
                      <option value="gói">gói</option>
                      <option value="hộp">hộp</option>
                      <option value="cái">cái</option>
                      <option value="bộ">bộ</option>
                    </select>
                    {newDonationForm.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = newDonationForm.items.filter((_, i) => i !== idx)
                          setNewDonationForm({ ...newDonationForm, items: newItems })
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setNewDonationForm({
                    ...newDonationForm,
                    items: [...newDonationForm.items, { name: '', quantity: '', unit: 'kg' }]
                  })
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm vật phẩm
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Lưu ý:</strong> Lô hàng sẽ được tạo với trạng thái "Chờ nhận" và cần xác nhận nhập kho sau.
              </p>
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddDialog(false)}>
            Hủy
          </Button>
          <Button onClick={() => {
            if (!newDonationForm.donorName || !newDonationForm.donorPhone) {
              toast.error('Vui lòng điền đầy đủ thông tin!')
              return
            }
            if (newDonationForm.items.some(item => !item.name || !item.quantity)) {
              toast.error('Vui lòng điền đầy đủ thông tin vật phẩm!')
              return
            }
            toast.success('Thêm lô hàng thành công!')
            setShowAddDialog(false)
            setNewDonationForm({
              donorName: '',
              donorPhone: '',
              items: [{ name: '', quantity: '', unit: 'kg' }]
            })
          }}>
            <Save className="w-4 h-4 mr-2" />
            Lưu lô hàng
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default WarehouseManager
