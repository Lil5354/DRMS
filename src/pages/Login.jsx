import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Mail, Lock, AlertCircle, Shield, Heart, Eye, EyeOff } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { users } from '../data/drms-mock'
import { useToast } from '../components/ui/toast'

function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Mock authentication
      const user = users.find(u => u.email === formData.email)
      
      if (!user) {
        setError('Email không tồn tại trong hệ thống')
        toast.error('Email không tồn tại trong hệ thống')
        setIsLoading(false)
        return
      }

      // Mock: password luôn là "123456"
      if (formData.password !== '123456') {
        setError('Mật khẩu không đúng')
        toast.error('Mật khẩu không đúng')
        setIsLoading(false)
        return
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user))
      
      // Show success toast
      toast.success(`Đăng nhập thành công! Chào mừng ${user.name}`)

      // Redirect based on role after a short delay
      setTimeout(() => {
        setIsLoading(false)
        switch (user.role) {
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
            navigate('/drms/donor')
        }
      }, 1000)
    }, 800) // Simulate network delay
  }

  // Quick login buttons for demo
  const quickLogin = (email) => {
    setFormData({ email, password: '123456' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-16 h-16 text-red-500 drop-shadow-2xl" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DRMS</h1>
          <p className="text-gray-600">Hệ thống Quản lý Thiện nguyện Thiên tai</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>Nhập thông tin để truy cập hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email của bạn"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full hover:scale-105 transition-all duration-300 hover:shadow-xl" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  'Đăng nhập'
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>

            {/* Demo Quick Login */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3 text-center">Demo - Đăng nhập nhanh:</p>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                  onClick={() => quickLogin('admin@drms.vn')}
                >
                  <Shield className="w-8 h-8 text-purple-500 mr-3 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Admin</p>
                    <p className="text-xs text-gray-500">admin@drms.vn</p>
                  </div>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                  onClick={() => quickLogin('manager1@drms.vn')}
                >
                  <Package className="w-8 h-8 text-blue-500 mr-3 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Quản lý kho</p>
                    <p className="text-xs text-gray-500">manager1@drms.vn</p>
                  </div>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                  onClick={() => quickLogin('donor@gmail.com')}
                >
                  <Heart className="w-8 h-8 text-red-500 mr-3 group-hover:text-red-600 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Người hảo tâm</p>
                    <p className="text-xs text-gray-500">donor@gmail.com</p>
                  </div>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Mật khẩu demo: <span className="font-mono font-semibold">123456</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
