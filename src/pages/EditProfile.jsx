import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, Mail, Phone, MapPin, Camera, Save, ArrowLeft, 
  Shield, Package, Heart, Lock, Edit2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { useToast } from '../components/ui/toast'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function EditProfile() {
  const navigate = useNavigate()
  const toast = useToast()
  useScrollAnimation()

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
    role: currentUser.role || 'DONOR'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const roleInfo = {
    ADMIN: { label: 'Quản trị viên', icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    WAREHOUSE_MANAGER: { label: 'Quản lý kho', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    DONOR: { label: 'Người hảo tâm', icon: Heart, color: 'text-red-600', bgColor: 'bg-red-50' }
  }

  const currentRoleInfo = roleInfo[formData.role]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Update user in localStorage
    const updatedUser = { ...currentUser, ...formData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    toast.success('Cập nhật thông tin thành công!')
    
    // Navigate back based on role
    setTimeout(() => {
      switch (formData.role) {
        case 'ADMIN':
          navigate('/drms/admin')
          break
        case 'WAREHOUSE_MANAGER':
          navigate('/drms/warehouse')
          break
        case 'DONOR':
          navigate('/drms/donor')
          break
        default:
          navigate('/')
      }
    }, 1000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu mới không khớp!')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }
    
    // Mock password change
    toast.success('Đổi mật khẩu thành công!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowPasswordForm(false)
  }

  const handleBack = () => {
    switch (formData.role) {
      case 'ADMIN':
        navigate('/drms/admin')
        break
      case 'WAREHOUSE_MANAGER':
        navigate('/drms/warehouse')
        break
      case 'DONOR':
        navigate('/drms/donor')
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg animate-slide-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBack}
              className="text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Chỉnh sửa thông tin cá nhân</h1>
              <p className="text-sm text-red-100">Cập nhật thông tin tài khoản của bạn</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1 scroll-scale">
              <CardContent className="p-6">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    <div className={`w-32 h-32 ${currentRoleInfo.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                      <currentRoleInfo.icon className={`w-16 h-16 ${currentRoleInfo.color}`} strokeWidth={1.5} />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 hover:scale-110 shadow-lg">
                      <Camera className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.name || 'Chưa có tên'}</h3>
                  <Badge className={`${currentRoleInfo.bgColor} ${currentRoleInfo.color} border-0`}>
                    {currentRoleInfo.label}
                  </Badge>
                  
                  <div className="mt-6 pt-6 border-t space-y-3 text-sm text-left">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="break-all">{formData.email || 'Chưa có email'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span>{formData.phone || 'Chưa có số điện thoại'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{formData.address || 'Chưa có địa chỉ'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <Card className="scroll-animate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit2 className="w-5 h-5" strokeWidth={1.5} />
                    Thông tin cá nhân
                  </CardTitle>
                  <CardDescription>Cập nhật thông tin cơ bản của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Họ và tên của bạn"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email của bạn"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Số điện thoại (10 số)"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
                        Địa chỉ
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 hover:scale-105 transition-all duration-300"
                        onClick={handleBack}
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 hover:scale-105 hover:shadow-xl transition-all duration-300"
                      >
                        <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
                        Lưu thay đổi
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Password Change */}
              <Card className="scroll-animate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" strokeWidth={1.5} />
                    Đổi mật khẩu
                  </CardTitle>
                  <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản</CardDescription>
                </CardHeader>
                <CardContent>
                  {!showPasswordForm ? (
                    <Button
                      variant="outline"
                      className="w-full hover:scale-105 transition-all duration-300"
                      onClick={() => setShowPasswordForm(true)}
                    >
                      <Lock className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      Đổi mật khẩu
                    </Button>
                  ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      {/* Current Password */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mật khẩu hiện tại *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mật khẩu mới *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Xác nhận mật khẩu mới *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        />
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 hover:scale-105 transition-all duration-300"
                          onClick={() => {
                            setShowPasswordForm(false)
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                          }}
                        >
                          Hủy
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 hover:scale-105 hover:shadow-xl transition-all duration-300"
                        >
                          <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
                          Đổi mật khẩu
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
