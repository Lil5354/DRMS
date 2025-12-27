import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Warehouse, Users, Package, 
  AlertCircle, CheckCircle, Clock, MapPin, Plus, Settings,
  BarChart3, Activity, Shield, Phone, Edit, Trash2, Save, Filter, Heart
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog'
import { ConfirmDialog } from '../components/ui/confirm-dialog'
import { FilterDialog } from '../components/ui/filter-dialog'
import { warehouses as mockWarehouses, donations as mockDonations, sosRequests as mockSOSRequests, users as mockUsers } from '../data/drms-mock'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useToast } from '../components/ui/toast'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

function AdminDashboard() {
  const navigate = useNavigate()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  
  // Load donations from localStorage and merge with mock data
  const [donations, setDonations] = useState(() => {
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]')
    // Merge with mock data, avoiding duplicates by id
    const allDonations = [...mockDonations]
    savedDonations.forEach(saved => {
      if (!allDonations.find(d => d.id === saved.id)) {
        allDonations.push(saved)
      } else {
        // Update existing donation
        const index = allDonations.findIndex(d => d.id === saved.id)
        allDonations[index] = saved
      }
    })
    return allDonations
  })

  // Load warehouses from localStorage and merge with mock data
  const [warehouses, setWarehouses] = useState(() => {
    const savedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]')
    const allWarehouses = [...mockWarehouses]
    savedWarehouses.forEach(saved => {
      if (!allWarehouses.find(w => w.id === saved.id)) {
        allWarehouses.push(saved)
      } else {
        const index = allWarehouses.findIndex(w => w.id === saved.id)
        allWarehouses[index] = saved
      }
    })
    return allWarehouses
  })

  // Load users from localStorage and merge with mock data
  const [users, setUsers] = useState(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const allUsers = [...mockUsers]
    savedUsers.forEach(saved => {
      if (!allUsers.find(u => u.id === saved.id)) {
        allUsers.push(saved)
      } else {
        const index = allUsers.findIndex(u => u.id === saved.id)
        allUsers[index] = saved
      }
    })
    return allUsers
  })

  // Load SOS requests from localStorage and merge with mock data
  const [sosRequests, setSosRequests] = useState(() => {
    const savedSOS = JSON.parse(localStorage.getItem('sosRequests') || '[]')
    const allSOS = [...mockSOSRequests]
    savedSOS.forEach(saved => {
      if (!allSOS.find(s => s.id === saved.id)) {
        allSOS.push(saved)
      } else {
        const index = allSOS.findIndex(s => s.id === saved.id)
        allSOS[index] = saved
      }
    })
    return allSOS
  })

  // Refresh all data when localStorage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      // Refresh donations
      const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]')
      const allDonations = [...mockDonations]
      savedDonations.forEach(saved => {
        if (!allDonations.find(d => d.id === saved.id)) {
          allDonations.push(saved)
        } else {
          const index = allDonations.findIndex(d => d.id === saved.id)
          allDonations[index] = saved
        }
      })
      setDonations(allDonations)

      // Refresh warehouses
      const savedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]')
      const allWarehouses = [...mockWarehouses]
      savedWarehouses.forEach(saved => {
        if (!allWarehouses.find(w => w.id === saved.id)) {
          allWarehouses.push(saved)
        } else {
          const index = allWarehouses.findIndex(w => w.id === saved.id)
          allWarehouses[index] = saved
        }
      })
      setWarehouses(allWarehouses)

      // Refresh users
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const allUsers = [...mockUsers]
      savedUsers.forEach(saved => {
        if (!allUsers.find(u => u.id === saved.id)) {
          allUsers.push(saved)
        } else {
          const index = allUsers.findIndex(u => u.id === saved.id)
          allUsers[index] = saved
        }
      })
      setUsers(allUsers)

      // Refresh SOS requests
      const savedSOS = JSON.parse(localStorage.getItem('sosRequests') || '[]')
      const allSOS = [...mockSOSRequests]
      savedSOS.forEach(saved => {
        if (!allSOS.find(s => s.id === saved.id)) {
          allSOS.push(saved)
        } else {
          const index = allSOS.findIndex(s => s.id === saved.id)
          allSOS[index] = saved
        }
      })
      setSosRequests(allSOS)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleStorageChange)
    }
  }, [])

  // Helper functions for CRUD operations
  const updateDonationStatus = (donationId, newStatus) => {
    const updatedDonations = donations.map(d => {
      if (d.id === donationId) {
        const updated = { ...d, status: newStatus }
        if (newStatus === 'RECEIVED' && !d.receivedAt) {
          updated.receivedAt = '2026-01-01T' + new Date().toTimeString().slice(0, 8)
        }
        if (newStatus === 'DISTRIBUTED' && !d.distributedAt) {
          updated.distributedAt = '2026-01-01T' + new Date().toTimeString().slice(0, 8)
        }
        return updated
      }
      return d
    })
    setDonations(updatedDonations)
    
    // Update localStorage
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]')
    const updatedSaved = savedDonations.map(d => {
      if (d.id === donationId) {
        const updated = { ...d, status: newStatus }
        if (newStatus === 'RECEIVED' && !d.receivedAt) {
          updated.receivedAt = '2026-01-01T' + new Date().toTimeString().slice(0, 8)
        }
        if (newStatus === 'DISTRIBUTED' && !d.distributedAt) {
          updated.distributedAt = '2026-01-01T' + new Date().toTimeString().slice(0, 8)
        }
        return updated
      }
      return d
    })
    localStorage.setItem('donations', JSON.stringify(updatedSaved))
  }

  const deleteDonation = (donationId) => {
    const updatedDonations = donations.filter(d => d.id !== donationId)
    setDonations(updatedDonations)
    
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]')
    const filtered = savedDonations.filter(d => d.id !== donationId)
    localStorage.setItem('donations', JSON.stringify(filtered))
  }

  const saveWarehouse = (warehouseData, isCreate) => {
    if (isCreate) {
      const newWarehouse = {
        ...warehouseData,
        id: 'hub-' + Date.now()
      }
      const updatedWarehouses = [...warehouses, newWarehouse]
      setWarehouses(updatedWarehouses)
      
      const savedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]')
      savedWarehouses.push(newWarehouse)
      localStorage.setItem('warehouses', JSON.stringify(savedWarehouses))
    } else {
      const updatedWarehouses = warehouses.map(w => 
        w.id === warehouseData.id ? warehouseData : w
      )
      setWarehouses(updatedWarehouses)
      
      const savedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]')
      const updatedSaved = savedWarehouses.map(w => 
        w.id === warehouseData.id ? warehouseData : w
      )
      // If not in saved, add it
      if (!updatedSaved.find(w => w.id === warehouseData.id)) {
        updatedSaved.push(warehouseData)
      }
      localStorage.setItem('warehouses', JSON.stringify(updatedSaved))
    }
  }

  const deleteWarehouse = (warehouseId) => {
    const updatedWarehouses = warehouses.filter(w => w.id !== warehouseId)
    setWarehouses(updatedWarehouses)
    
    const savedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]')
    const filtered = savedWarehouses.filter(w => w.id !== warehouseId)
    localStorage.setItem('warehouses', JSON.stringify(filtered))
  }

  const saveUser = (userData, isCreate) => {
    if (isCreate) {
      const newUser = {
        ...userData,
        id: 'user-' + Date.now()
      }
      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      savedUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(savedUsers))
    } else {
      const updatedUsers = users.map(u => 
        u.id === userData.id ? userData : u
      )
      setUsers(updatedUsers)
      
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedSaved = savedUsers.map(u => 
        u.id === userData.id ? userData : u
      )
      if (!updatedSaved.find(u => u.id === userData.id)) {
        updatedSaved.push(userData)
      }
      localStorage.setItem('users', JSON.stringify(updatedSaved))
    }
  }

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId)
    setUsers(updatedUsers)
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const filtered = savedUsers.filter(u => u.id !== userId)
    localStorage.setItem('users', JSON.stringify(filtered))
  }

  const updateSOSStatus = (sosId, newStatus) => {
    const updatedSOS = sosRequests.map(s => 
      s.id === sosId ? { ...s, status: newStatus } : s
    )
    setSosRequests(updatedSOS)
    
    const savedSOS = JSON.parse(localStorage.getItem('sosRequests') || '[]')
    const updatedSaved = savedSOS.map(s => 
      s.id === sosId ? { ...s, status: newStatus } : s
    )
    if (!updatedSaved.find(s => s.id === sosId)) {
      const sos = sosRequests.find(s => s.id === sosId)
      if (sos) {
        updatedSaved.push({ ...sos, status: newStatus })
      }
    }
    localStorage.setItem('sosRequests', JSON.stringify(updatedSaved))
  }

  const deleteSOS = (sosId) => {
    const updatedSOS = sosRequests.filter(s => s.id !== sosId)
    setSosRequests(updatedSOS)
    
    const savedSOS = JSON.parse(localStorage.getItem('sosRequests') || '[]')
    const filtered = savedSOS.filter(s => s.id !== sosId)
    localStorage.setItem('sosRequests', JSON.stringify(filtered))
  }
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [showWarehouseDialog, setShowWarehouseDialog] = useState(false)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [showSOSDialog, setShowSOSDialog] = useState(false)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [selectedSOS, setSelectedSOS] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [isEditingDonation, setIsEditingDonation] = useState(false)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [donationStatusUpdate, setDonationStatusUpdate] = useState('REGISTERED')
  const [editFormData, setEditFormData] = useState(null)
  const [userFormData, setUserFormData] = useState(null)
  const [deleteType, setDeleteType] = useState('') // 'warehouse', 'user', 'sos', 'donation'
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [chartsVisible, setChartsVisible] = useState({
    bar: false,
    doughnut: false,
    line: false
  })
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filterType, setFilterType] = useState('donation')
  const [donationFilters, setDonationFilters] = useState({ status: 'ALL', dateFrom: '', dateTo: '' })
  const [warehouseFilters, setWarehouseFilters] = useState({ status: 'ALL', type: 'ALL' })
  const [sosFilters, setSOSFilters] = useState({ status: 'ALL', urgency: 'ALL' })
  const [userFilters, setUserFilters] = useState({ role: 'ALL' })
  
  // Filtered data
  const filteredDonations = donations.filter(d => {
    if (donationFilters.status !== 'ALL' && d.status !== donationFilters.status) return false
    if (donationFilters.dateFrom && new Date(d.registeredAt) < new Date(donationFilters.dateFrom)) return false
    if (donationFilters.dateTo && new Date(d.registeredAt) > new Date(donationFilters.dateTo)) return false
    return true
  })
  
  const filteredWarehouses = warehouses.filter(w => {
    if (warehouseFilters.status !== 'ALL' && w.status !== warehouseFilters.status) return false
    if (warehouseFilters.type !== 'ALL' && w.type !== warehouseFilters.type) return false
    return true
  })
  
  const filteredSOS = sosRequests.filter(s => {
    if (sosFilters.status !== 'ALL' && s.status !== sosFilters.status) return false
    if (sosFilters.urgency !== 'ALL' && s.urgency !== sosFilters.urgency) return false
    return true
  })
  
  const filteredUsers = users.filter(u => {
    if (userFilters.role !== 'ALL' && u.role !== userFilters.role) return false
    return true
  })
  
  const barChartRef = React.useRef(null)
  const doughnutChartRef = React.useRef(null)
  const lineChartRef = React.useRef(null)
  
  // Chart visibility observer
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    }
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chartType = entry.target.dataset.chart
          setChartsVisible(prev => ({ ...prev, [chartType]: true }))
        }
      })
    }
    
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (barChartRef.current) observer.observe(barChartRef.current)
    if (doughnutChartRef.current) observer.observe(doughnutChartRef.current)
    if (lineChartRef.current) observer.observe(lineChartRef.current)
    
    return () => observer.disconnect()
  }, [activeTab])
  
  // Reset charts when switching tabs
  React.useEffect(() => {
    setChartsVisible({ bar: false, doughnut: false, line: false })
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

  const stats = [
    {
      title: 'Tổng điểm tập kết',
      value: warehouses.length,
      change: '+2 tuần này',
      icon: Warehouse,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Lô hàng đã nhận',
      value: donations.filter(d => d.status === 'RECEIVED' || d.status === 'DISTRIBUTED').length,
      change: '+12 hôm nay',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Yêu cầu SOS',
      value: sosRequests.filter(s => s.status === 'OPEN').length,
      change: 'Cần xử lý',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Người dùng',
      value: users.length,
      change: '+5 tuần này',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'donation', text: 'Công ty ABC đăng ký ủng hộ 100kg gạo', time: '5 phút trước', icon: Package },
    { id: 2, type: 'sos', text: 'Yêu cầu SOS mới từ Hoàn Kiếm', time: '15 phút trước', icon: AlertCircle },
    { id: 3, type: 'warehouse', text: 'Kho Đống Đa đã nhận 50 thùng nước', time: '1 giờ trước', icon: Warehouse },
    { id: 4, type: 'user', text: 'Quản lý kho mới được thêm', time: '2 giờ trước', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10 animate-slide-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-10 h-10 text-red-500 hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Hệ thống quản lý DRMS</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/drms/profile/edit')}
              >
                <Settings className="w-4 h-4" strokeWidth={1.5} />
                Cài đặt
              </Button>
              <div 
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate('/drms/profile/edit')}
              >
                <Shield className="w-8 h-8 text-red-600" strokeWidth={1.5} />
                <span className="text-sm font-medium">Admin</span>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'warehouses', label: 'Điểm tập kết', icon: Warehouse },
              { id: 'donations', label: 'Quyên góp', icon: Package },
              { id: 'sos', label: 'SOS', icon: AlertCircle },
              { id: 'users', label: 'Người dùng', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600 font-semibold'
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                      </div>
                      <stat.icon className={`w-12 h-12 ${stat.color} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts & Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Warehouse Status */}
              <Card className="lg:col-span-2 scroll-animate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Trạng thái điểm tập kết
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {warehouses.map(warehouse => (
                      <div 
                        key={warehouse.id} 
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
                        onClick={() => {
                          setSelectedWarehouse(warehouse)
                          setShowWarehouseDialog(true)
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">{warehouse.name}</h4>
                            <Badge 
                              variant={warehouse.status === 'OPEN' ? 'default' : 'destructive'}
                              className={warehouse.status === 'OPEN' ? 'bg-green-500' : ''}
                            >
                              {warehouse.status === 'OPEN' ? 'Đang mở' : 'Đã đầy'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                            <MapPin className="w-3 h-3" />
                            {warehouse.address}
                          </div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Sức chứa</span>
                            <span className="font-semibold">{warehouse.currentLoad}/{warehouse.capacity}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                warehouse.currentLoad / warehouse.capacity > 0.8 
                                  ? 'bg-red-500' 
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${(warehouse.currentLoad / warehouse.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="scroll-fade-right">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Hoạt động gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === 'donation' ? 'bg-green-100 text-green-600' :
                          activity.type === 'sos' ? 'bg-red-100 text-red-600' :
                          activity.type === 'warehouse' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donation Trends */}
              <Card className="scroll-fade-left" ref={barChartRef} data-chart="bar">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Xu hướng quyên góp
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
                            label: 'Quyên góp',
                            data: [12, 19, 15, 25, 22, 30, 28],
                            backgroundColor: 'rgba(239, 68, 68, 0.8)',
                            borderColor: 'rgba(239, 68, 68, 1)',
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
                          onComplete: () => {},
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

              {/* Warehouse Capacity */}
              <Card className="scroll-fade-right" ref={doughnutChartRef} data-chart="doughnut">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Phân bổ sức chứa
                  </CardTitle>
                  <CardDescription>Tình trạng các điểm tập kết</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    {chartsVisible.doughnut && (
                      <Doughnut
                        data={{
                          labels: ['Đã sử dụng', 'Còn trống'],
                          datasets: [
                            {
                              data: [
                              warehouses.reduce((sum, w) => sum + w.currentLoad, 0),
                              warehouses.reduce((sum, w) => sum + (w.capacity - w.currentLoad), 0)
                            ],
                            backgroundColor: [
                              'rgba(239, 68, 68, 0.8)',
                              'rgba(34, 197, 94, 0.8)'
                            ],
                            borderColor: [
                              'rgba(239, 68, 68, 1)',
                              'rgba(34, 197, 94, 1)'
                            ],
                            borderWidth: 2,
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        animation: {
                          animateRotate: true,
                          animateScale: true,
                          duration: 2000,
                          easing: 'easeInOutQuart'
                        },
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              padding: 20,
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
                            bodyFont: { size: 13 },
                            callbacks: {
                              label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                                const percentage = ((context.parsed / total) * 100).toFixed(1)
                                return `${context.label}: ${context.parsed} (${percentage}%)`
                              }
                            }
                          }
                        }
                      }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="lg:col-span-2 scroll-scale" ref={lineChartRef} data-chart="line">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Hoạt động theo thời gian
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
                            label: 'Quyên góp',
                            data: [45, 52, 48, 65, 70, 85, 90],
                            borderColor: 'rgba(239, 68, 68, 1)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                          pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                          pointBorderColor: '#fff',
                          pointBorderWidth: 2,
                        },
                        {
                          label: 'SOS',
                          data: [8, 12, 10, 15, 18, 14, 12],
                          borderColor: 'rgba(59, 130, 246, 1)',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          tension: 0.4,
                          fill: true,
                          pointRadius: 5,
                          pointHoverRadius: 7,
                          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
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

            {/* Quick Actions */}
            <Card className="scroll-scale">
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
                <CardDescription>Các chức năng quản trị thường dùng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    className="h-auto py-4 flex-col gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group" 
                    variant="outline"
                    onClick={() => {
                      setIsCreateMode(true)
                      setEditFormData({
                        name: '',
                        type: 'COLLECTION_POINT',
                        address: '',
                        phone: '',
                        capacity: 500,
                        currentLoad: 0,
                        openHours: '8:00 - 18:00',
                        status: 'OPEN',
                        manager: '',
                        acceptedItems: []
                      })
                      setShowWarehouseDialog(true)
                    }}
                  >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={1.5} />
                    <span className="text-sm">Thêm điểm tập kết</span>
                  </Button>
                  <Button 
                    className="h-auto py-4 flex-col gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group" 
                    variant="outline"
                    onClick={() => toast.info('Chức năng đang phát triển')}
                  >
                    <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <span className="text-sm">Quản lý người dùng</span>
                  </Button>
                  <Button 
                    className="h-auto py-4 flex-col gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group" 
                    variant="outline"
                    onClick={() => toast.info('Chức năng đang phát triển')}
                  >
                    <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <span className="text-sm">Xem báo cáo</span>
                  </Button>
                  <Button 
                    className="h-auto py-4 flex-col gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group" 
                    variant="outline"
                    onClick={() => navigate('/drms/profile/edit')}
                  >
                    <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={1.5} />
                    <span className="text-sm">Cấu hình hệ thống</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Quản lý quyên góp</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFilterType('donation')
                    setShowFilterDialog(true)
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc {Object.values(donationFilters).filter(v => v && v !== 'ALL').length > 0 && `(${Object.values(donationFilters).filter(v => v && v !== 'ALL').length})`}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredDonations.map(donation => (
                <Card key={donation.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-green-600" strokeWidth={1.5} />
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
                          <Badge 
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
                        
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Danh sách vật phẩm:</p>
                          <div className="flex flex-wrap gap-2">
                            {donation.items.map((item, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 px-3 py-1 rounded-full border">
                                {item.name}: {item.quantity} {item.unit}
                              </span>
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
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedDonation(donation)
                                setShowDonationDialog(true)
                              }}
                            >
                              Xem chi tiết
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Yêu cầu SOS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sosRequests.map(sos => (
                <Card key={sos.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        sos.urgency === 'HIGH' ? 'bg-red-100' : 
                        sos.urgency === 'MEDIUM' ? 'bg-amber-100' : 'bg-blue-100'
                      }`}>
                        <AlertCircle className={`w-6 h-6 ${
                          sos.urgency === 'HIGH' ? 'text-red-600' : 
                          sos.urgency === 'MEDIUM' ? 'text-amber-600' : 'text-blue-600'
                        }`} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">{sos.location}</h3>
                            <p className="text-sm text-gray-600 mt-1">{sos.description}</p>
                          </div>
                          <Badge 
                            variant={sos.status === 'OPEN' ? 'destructive' : 'default'}
                            className={sos.status === 'OPEN' ? '' : 'bg-green-500'}
                          >
                            {sos.status === 'OPEN' ? 'Đang xử lý' : 'Đã giải quyết'}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm mb-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{sos.affectedPeople} người bị ảnh hưởng</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{sos.contactPhone}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(sos.createdAt).toLocaleString('vi-VN')}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedSOS(sos)
                              setShowSOSDialog(true)
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
              <Button onClick={() => {
                setIsCreatingUser(true)
                setUserFormData({
                  name: '',
                  email: '',
                  role: 'DONOR',
                  password: ''
                })
                setShowUserDialog(true)
              }}>
                <Plus className="w-4 h-4" />
                Thêm người dùng
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <Card key={user.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        user.role === 'ADMIN' ? 'bg-purple-100' :
                        user.role === 'WAREHOUSE_MANAGER' ? 'bg-blue-100' :
                        'bg-red-100'
                      }`}>
                        {user.role === 'ADMIN' ? (
                          <Shield className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                        ) : user.role === 'WAREHOUSE_MANAGER' ? (
                          <Package className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                        ) : (
                          <Heart className="w-6 h-6 text-red-600" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                        <Badge variant="outline" className="mt-2">
                          {user.role === 'ADMIN' ? 'Quản trị viên' :
                           user.role === 'WAREHOUSE_MANAGER' ? 'Quản lý kho' :
                           'Người hảo tâm'}
                        </Badge>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowUserDialog(true)
                            }}
                          >
                            Chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'warehouses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Quản lý điểm tập kết</h2>
              <Button onClick={() => {
                setIsCreateMode(true)
                setEditFormData({
                  name: '',
                  type: 'COLLECTION_POINT',
                  address: '',
                  phone: '',
                  capacity: 500,
                  currentLoad: 0,
                  openHours: '8:00 - 18:00',
                  status: 'OPEN',
                  manager: '',
                  acceptedItems: []
                })
                setShowWarehouseDialog(true)
              }}>
                <Plus className="w-4 h-4" />
                Thêm điểm mới
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {warehouses.map(warehouse => (
                <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                      <Badge variant={warehouse.status === 'OPEN' ? 'default' : 'destructive'}>
                        {warehouse.status}
                      </Badge>
                    </div>
                    <CardDescription>{warehouse.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quản lý:</span>
                        <span className="font-medium">{warehouse.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sức chứa:</span>
                        <span className="font-medium">{warehouse.currentLoad}/{warehouse.capacity}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => {
                          setSelectedWarehouse(warehouse)
                          setShowWarehouseDialog(true)
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Warehouse Detail Dialog */}
      <Dialog open={showWarehouseDialog} onClose={() => {
        setShowWarehouseDialog(false)
        setIsEditMode(false)
        setIsCreateMode(false)
        setEditFormData(null)
      }}>
        <DialogHeader onClose={() => {
          setShowWarehouseDialog(false)
          setIsEditMode(false)
          setIsCreateMode(false)
          setEditFormData(null)
        }}>
          <DialogTitle>
            {isCreateMode ? 'Thêm điểm tập kết mới' : 
             isEditMode ? 'Chỉnh sửa điểm tập kết' : 
             selectedWarehouse?.name}
          </DialogTitle>
          <DialogDescription>
            {isCreateMode ? 'Tạo điểm tập kết mới trong hệ thống' :
             isEditMode ? 'Cập nhật thông tin điểm tập kết' : 
             'Chi tiết điểm tập kết'}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedWarehouse && !isEditMode && !isCreateMode && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <Badge 
                  variant={selectedWarehouse.status === 'OPEN' ? 'default' : 'destructive'}
                  className={`text-base px-4 py-2 ${selectedWarehouse.status === 'OPEN' ? 'bg-green-500' : ''}`}
                >
                  {selectedWarehouse.status === 'OPEN' ? 'Đang hoạt động' : 'Đã đầy'}
                </Badge>
                <Badge variant="outline" className="text-base px-4 py-2">
                  {selectedWarehouse.type === 'CENTRAL_HUB' ? 'Kho Tổng' :
                   selectedWarehouse.type === 'COLLECTION_POINT' ? 'Điểm Gom' :
                   'Điểm Phát'}
                </Badge>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Địa chỉ</label>
                    <div className="flex items-start gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{selectedWarehouse.address}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Số điện thoại</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedWarehouse.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Giờ hoạt động</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedWarehouse.openHours}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Quản lý</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedWarehouse.manager}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Sức chứa</label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{selectedWarehouse.currentLoad} / {selectedWarehouse.capacity}</span>
                        <span className="font-semibold">
                          {Math.round((selectedWarehouse.currentLoad / selectedWarehouse.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            selectedWarehouse.currentLoad / selectedWarehouse.capacity > 0.8 
                              ? 'bg-red-500' 
                              : selectedWarehouse.currentLoad / selectedWarehouse.capacity > 0.6
                              ? 'bg-amber-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${(selectedWarehouse.currentLoad / selectedWarehouse.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accepted Items */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Vật phẩm tiếp nhận</label>
                <div className="flex flex-wrap gap-2">
                  {selectedWarehouse.acceptedItems.map((item, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Tọa độ</label>
                <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono">
                  Lat: {selectedWarehouse.location.lat}, Lng: {selectedWarehouse.location.lng}
                </div>
              </div>
            </div>
          )}

          {/* Create/Edit Form */}
          {(isEditMode || isCreateMode) && editFormData && (
            <form onSubmit={(e) => {
              e.preventDefault()
              if (editFormData) {
                saveWarehouse(editFormData, isCreateMode)
                if (isCreateMode) {
                  toast.success('Thêm điểm tập kết mới thành công!')
                } else {
                  toast.success('Cập nhật điểm tập kết thành công!')
                }
              }
              setShowWarehouseDialog(false)
              setIsEditMode(false)
              setIsCreateMode(false)
              setEditFormData(null)
            }} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên điểm tập kết *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ *
                </label>
                <textarea
                  required
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Phone, Hours & Manager */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giờ hoạt động
                  </label>
                  <input
                    type="text"
                    value={editFormData.openHours}
                    onChange={(e) => setEditFormData({ ...editFormData, openHours: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quản lý
                  </label>
                  <input
                    type="text"
                    value={editFormData.manager || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, manager: e.target.value })}
                    placeholder="Tên quản lý"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Capacity & Status */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sức chứa
                  </label>
                  <input
                    type="number"
                    value={editFormData.capacity}
                    onChange={(e) => setEditFormData({ ...editFormData, capacity: parseInt(e.target.value) })}
                    min="100"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đã dùng
                  </label>
                  <input
                    type="number"
                    value={editFormData.currentLoad}
                    onChange={(e) => setEditFormData({ ...editFormData, currentLoad: parseInt(e.target.value) })}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="OPEN">Đang mở</option>
                    <option value="FULL">Đã đầy</option>
                    <option value="CLOSED">Đóng cửa</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
        <DialogFooter>
          {!isEditMode && !isCreateMode ? (
            <>
              <Button 
                variant="outline"
                className="hover:bg-red-50 hover:text-red-600"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowWarehouseDialog(false)
                  setIsEditMode(false)
                }}
              >
                Đóng
              </Button>
              <Button
                onClick={() => {
                  setIsEditMode(true)
                  setEditFormData({ ...selectedWarehouse })
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={() => {
                  setIsEditMode(false)
                  setIsCreateMode(false)
                  setEditFormData(null)
                  if (!isCreateMode) {
                    // If editing, stay in dialog to show details
                  } else {
                    // If creating, close dialog
                    setShowWarehouseDialog(false)
                  }
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  if (editFormData) {
                    saveWarehouse(editFormData, isCreateMode)
                    if (isCreateMode) {
                      toast.success('Thêm điểm tập kết mới thành công!')
                    } else {
                      toast.success('Cập nhật điểm tập kết thành công!')
                    }
                  }
                  setShowWarehouseDialog(false)
                  setIsEditMode(false)
                  setIsCreateMode(false)
                  setEditFormData(null)
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                {isCreateMode ? 'Tạo mới' : 'Lưu thay đổi'}
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false)
          setDeleteType('')
        }}
        onConfirm={() => {
          if (deleteType === 'warehouse') {
            if (selectedWarehouse) {
              deleteWarehouse(selectedWarehouse.id)
              toast.success('Đã xóa điểm tập kết thành công!')
            }
            setShowWarehouseDialog(false)
            setSelectedWarehouse(null)
          } else if (deleteType === 'user') {
            if (selectedUser) {
              deleteUser(selectedUser.id)
              toast.success('Đã xóa người dùng thành công!')
            }
            setShowUserDialog(false)
            setSelectedUser(null)
          } else if (deleteType === 'sos') {
            if (selectedSOS) {
              deleteSOS(selectedSOS.id)
              toast.success('Đã xóa yêu cầu SOS thành công!')
            }
            setShowSOSDialog(false)
            setSelectedSOS(null)
          } else if (deleteType === 'donation') {
            if (selectedDonation) {
              deleteDonation(selectedDonation.id)
              toast.success('Đã xóa quyên góp thành công!')
            }
            setShowDonationDialog(false)
            setSelectedDonation(null)
          }
          setDeleteType('')
        }}
        title={
          deleteType === 'warehouse' ? 'Xóa điểm tập kết' :
          deleteType === 'user' ? 'Xóa người dùng' :
          deleteType === 'sos' ? 'Xóa yêu cầu SOS' :
          deleteType === 'donation' ? 'Xóa quyên góp' :
          'Xác nhận xóa'
        }
        description={
          deleteType === 'warehouse' ? `Bạn có chắc chắn muốn xóa điểm tập kết "${selectedWarehouse?.name}"?` :
          deleteType === 'user' ? `Bạn có chắc chắn muốn xóa người dùng "${selectedUser?.name}"?` :
          deleteType === 'sos' ? `Bạn có chắc chắn muốn xóa yêu cầu SOS tại "${selectedSOS?.location}"?` :
          deleteType === 'donation' ? `Bạn có chắc chắn muốn xóa quyên góp của "${selectedDonation?.donorName}"?` :
          'Bạn có chắc chắn muốn xóa?'
        }
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />

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
            {isEditingDonation ? 'Cập nhật trạng thái quyên góp' : 'Chi tiết quyên góp'}
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
                  <p className="text-sm mt-1">{selectedDonation.donorPhone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Danh sách vật phẩm</label>
                <div className="space-y-2">
                  {selectedDonation.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">{item.quantity} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Trạng thái hiện tại</label>
                <Badge className="mt-1">
                  {selectedDonation.status === 'REGISTERED' ? 'Chờ nhận' :
                   selectedDonation.status === 'RECEIVED' ? 'Đã nhận' : 'Đã phát'}
                </Badge>
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                onClick={() => {
                  setShowDeleteConfirm(true)
                  setDeleteType('donation')
                }}
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
                if (selectedDonation) {
                  updateDonationStatus(selectedDonation.id, donationStatusUpdate)
                  toast.success('Cập nhật trạng thái thành công!')
                }
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

      {/* SOS Detail Dialog */}
      <Dialog open={showSOSDialog} onClose={() => setShowSOSDialog(false)}>
        <DialogHeader onClose={() => setShowSOSDialog(false)}>
          <DialogTitle>Chi tiết yêu cầu SOS</DialogTitle>
          <DialogDescription>{selectedSOS?.location}</DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedSOS && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Địa điểm</label>
                <p className="text-sm mt-1 font-medium">{selectedSOS.location}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Mô tả tình huống</label>
                <p className="text-sm mt-1">{selectedSOS.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Số người bị ảnh hưởng</label>
                  <p className="text-sm mt-1 font-medium">{selectedSOS.affectedPeople} người</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Mức độ khẩn cấp</label>
                  <Badge className={`mt-1 ${
                    selectedSOS.urgency === 'HIGH' ? 'bg-red-500' :
                    selectedSOS.urgency === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}>
                    {selectedSOS.urgency === 'HIGH' ? 'Cao' :
                     selectedSOS.urgency === 'MEDIUM' ? 'Trung bình' : 'Thấp'}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Liên hệ</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-medium">{selectedSOS.contactPhone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Trạng thái</label>
                <Badge className={`mt-1 ${selectedSOS.status === 'OPEN' ? 'bg-red-500' : 'bg-green-500'}`}>
                  {selectedSOS.status === 'OPEN' ? 'Đang xử lý' : 'Đã giải quyết'}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Thời gian tạo</label>
                <p className="text-sm mt-1">{new Date(selectedSOS.createdAt).toLocaleString('vi-VN')}</p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          {selectedSOS?.status === 'OPEN' && (
            <Button 
              variant="outline"
              className="hover:bg-red-50 hover:text-red-600"
              onClick={() => {
                setShowDeleteConfirm(true)
                setDeleteType('sos')
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowSOSDialog(false)}>Đóng</Button>
          {selectedSOS?.status === 'OPEN' && (
            <Button onClick={() => {
              if (selectedSOS) {
                updateSOSStatus(selectedSOS.id, 'RESOLVED')
                toast.success('Đã đánh dấu SOS đã giải quyết')
              }
              setShowSOSDialog(false)
            }}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Đánh dấu đã giải quyết
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      {/* User Detail/Edit Dialog */}
      <Dialog open={showUserDialog} onClose={() => {
        setShowUserDialog(false)
        setIsEditingUser(false)
        setIsCreatingUser(false)
        setUserFormData(null)
      }}>
        <DialogHeader onClose={() => {
          setShowUserDialog(false)
          setIsEditingUser(false)
          setIsCreatingUser(false)
          setUserFormData(null)
        }}>
          <DialogTitle>
            {isCreatingUser ? 'Thêm người dùng mới' :
             isEditingUser ? 'Chỉnh sửa người dùng' :
             'Chi tiết người dùng'}
          </DialogTitle>
          <DialogDescription>
            {isCreatingUser ? 'Tạo tài khoản người dùng mới' :
             isEditingUser ? 'Cập nhật thông tin người dùng' :
             selectedUser?.email}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedUser && !isEditingUser && !isCreatingUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Họ và tên</label>
                <p className="text-sm mt-1">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <p className="text-sm mt-1">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Vai trò</label>
                <Badge className="mt-1">
                  {selectedUser.role === 'ADMIN' ? 'Quản trị viên' :
                   selectedUser.role === 'WAREHOUSE_MANAGER' ? 'Quản lý kho' :
                   'Người hảo tâm'}
                </Badge>
              </div>
            </div>
          )}

          {(isEditingUser || isCreatingUser) && userFormData && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  placeholder="Họ và tên người dùng"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  placeholder="Email người dùng"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vai trò *
                </label>
                <select
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="DONOR">Người hảo tâm</option>
                  <option value="WAREHOUSE_MANAGER">Quản lý kho</option>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
              </div>

              {isCreatingUser && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mật khẩu *
                  </label>
                  <input
                    type="password"
                    required
                    value={userFormData.password || ''}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    placeholder="Mật khẩu"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}
            </form>
          )}
        </DialogContent>
        <DialogFooter>
          {!isEditingUser && !isCreatingUser ? (
            <>
              <Button 
                variant="outline" 
                className="hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  setShowDeleteConfirm(true)
                  setDeleteType('user')
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa
              </Button>
              <Button variant="outline" onClick={() => setShowUserDialog(false)}>Đóng</Button>
              <Button onClick={() => {
                setIsEditingUser(true)
                setUserFormData({ ...selectedUser })
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => {
                setIsEditingUser(false)
                setIsCreatingUser(false)
                setUserFormData(null)
              }}>
                Hủy
              </Button>
              <Button onClick={() => {
                if (userFormData) {
                  saveUser(userFormData, isCreatingUser)
                  if (isCreatingUser) {
                    toast.success('Thêm người dùng mới thành công!')
                  } else {
                    toast.success('Cập nhật người dùng thành công!')
                  }
                }
                setShowUserDialog(false)
                setIsEditingUser(false)
                setIsCreatingUser(false)
                setUserFormData(null)
              }}>
                <Save className="w-4 h-4 mr-2" />
                {isCreatingUser ? 'Tạo mới' : 'Lưu thay đổi'}
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>

      {/* Filter Dialog */}
      <FilterDialog
        open={showFilterDialog}
        onClose={() => setShowFilterDialog(false)}
        type={filterType}
        filters={
          filterType === 'donation' ? donationFilters :
          filterType === 'warehouse' ? warehouseFilters :
          filterType === 'sos' ? sosFilters :
          userFilters
        }
        onFilterChange={(newFilters) => {
          if (filterType === 'donation') setDonationFilters(newFilters)
          else if (filterType === 'warehouse') setWarehouseFilters(newFilters)
          else if (filterType === 'sos') setSOSFilters(newFilters)
          else setUserFilters(newFilters)
        }}
        onApply={(filters) => {
          toast.success('Đã áp dụng bộ lọc!')
        }}
      />
    </div>
  )
}

export default AdminDashboard
