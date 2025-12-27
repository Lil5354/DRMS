import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Package, Shield, ArrowRight, Heart, MapPin, Users, Mail, 
  Phone, CheckCircle, TrendingUp, Clock, Zap, Globe
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function DRMSLanding() {
  const navigate = useNavigate()
  useScrollAnimation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <Package className="w-20 h-20 text-white drop-shadow-2xl" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              Hệ Thống Quản Lý
              <br />
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                Thiện Nguyện Thiên Tai
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Kết nối người hảo tâm với đồng bào vùng lũ một cách minh bạch và hiệu quả
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-yellow-300" />
                <span>100% Minh bạch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-yellow-300" />
                <span>Theo dõi realtime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-yellow-300" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                size="lg"
                className="text-lg px-10 py-7 h-auto bg-white text-red-600 hover:bg-red-50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                onClick={() => navigate('/drms/donor')}
              >
                <Heart className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                Tôi muốn ủng hộ
              </Button>
              <Button 
                size="lg"
                className="text-lg px-10 py-7 h-auto bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300 group"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto scroll-animate">
            <div className="text-center animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">5+</div>
              <p className="text-gray-600">Điểm tập kết</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">150+</div>
              <p className="text-gray-600">Lô hàng</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">1000+</div>
              <p className="text-gray-600">Người hảo tâm</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">24/7</div>
              <p className="text-gray-600">Hỗ trợ</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cách thức hoạt động
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quy trình đơn giản, minh bạch và hiệu quả - Chỉ 4 bước để giúp đỡ đồng bào
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-scale border-2 hover:border-red-500">
              <CardContent className="p-8">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-20 h-20 text-red-500 group-hover:text-red-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 font-bold text-xl">
                  1
                </div>
                <h3 className="font-bold text-xl mb-3">Tìm điểm tập kết</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hệ thống tự động gợi ý điểm tập kết gần bạn nhất dựa trên GPS
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-scale border-2 hover:border-blue-500" style={{ transitionDelay: '0.1s' }}>
              <CardContent className="p-8">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-20 h-20 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                  2
                </div>
                <h3 className="font-bold text-xl mb-3">Đăng ký gửi hàng</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Đăng ký trực tuyến, nhận mã QR để check-in nhanh chóng
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-scale border-2 hover:border-green-500" style={{ transitionDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-20 h-20 text-green-500 group-hover:text-green-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold text-xl">
                  3
                </div>
                <h3 className="font-bold text-xl mb-3">Giao hàng tại kho</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mang hàng đến điểm tập kết, quét QR để xác nhận nhập kho
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-scale border-2 hover:border-purple-500" style={{ transitionDelay: '0.3s' }}>
              <CardContent className="p-8">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-20 h-20 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-xl">
                  4
                </div>
                <h3 className="font-bold text-xl mb-3">Theo dõi hành trình</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tra cứu mã vận đơn, biết hàng của bạn đã đến đâu
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Giải pháp toàn diện cho công tác cứu trợ thiên tai
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-fade-left group border-2 hover:border-red-500">
              <CardContent className="p-0">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-16 h-16 text-red-500 group-hover:text-red-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-2xl mb-4">Hub-First Strategy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gợi ý điểm tập kết gần nhất, tối ưu hóa luồng hàng hóa, giảm tải cho vùng thiên tai
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-animate group border-2 hover:border-blue-500" style={{ transitionDelay: '0.1s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-16 h-16 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-2xl mb-4">Quản lý Logistics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Theo dõi hành trình từ khi đăng ký đến khi phát hàng, mã QR tracking cho mọi lô hàng
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-fade-right group border-2 hover:border-green-500" style={{ transitionDelay: '0.2s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-16 h-16 text-green-500 group-hover:text-green-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-2xl mb-4">Minh bạch & An toàn</h3>
                <p className="text-gray-600 leading-relaxed">
                  Xác minh đa tầng, công khai nguồn gốc và đích đến của mọi lô hàng cứu trợ
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 scroll-fade-left group border-2 hover:border-purple-500" style={{ transitionDelay: '0.3s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-16 h-16 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-2xl mb-4">Realtime Updates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cập nhật trạng thái theo thời gian thực, thông báo ngay khi có thay đổi
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group border-2 hover:border-orange-500" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-16 h-16 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-2xl mb-4">Hỗ trợ 24/7</h3>
                <p className="text-gray-600 leading-relaxed">
                  Đội ngũ hỗ trợ sẵn sàng 24/7, giải đáp mọi thắc mắc của bạn
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group border-2 hover:border-indigo-500" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-16 h-16 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-2xl mb-4">Đa nền tảng</h3>
                <p className="text-gray-600 leading-relaxed">
                  Truy cập mọi lúc mọi nơi trên web, mobile, hoạt động cả khi offline
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Sẵn sàng giúp đỡ đồng bào?
            </h2>
            <p className="text-xl mb-10 text-red-100 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Mỗi đóng góp của bạn đều có ý nghĩa. Hãy bắt đầu ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg"
                className="text-lg px-12 py-7 h-auto bg-white text-red-600 hover:bg-red-50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                onClick={() => navigate('/drms/donor')}
              >
                <Heart className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                Bắt đầu ủng hộ
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors duration-300">
                  <Phone className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl mb-3">Hotline</h3>
                <a
                  href="tel:19009300"
                  className="text-red-600 hover:text-red-700 text-lg font-semibold"
                >
                  1900 9300
                </a>
                <p className="text-gray-500 text-sm mt-2">Hỗ trợ 24/7</p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Mail className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl mb-3">Email</h3>
                <a
                  href="mailto:support@drms.vn"
                  className="text-blue-600 hover:text-blue-700 font-semibold break-all"
                >
                  support@drms.vn
                </a>
                <p className="text-gray-500 text-sm mt-2">Phản hồi trong 24h</p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <MapPin className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl mb-3">Địa chỉ</h3>
                <p className="text-gray-700 leading-relaxed">
                  Hà Nội, Việt Nam
                </p>
                <p className="text-gray-500 text-sm mt-2">Văn phòng chính</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1 - About */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">DRMS</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Hệ thống quản lý thiện nguyện thiên tai, kết nối người hảo tâm với đồng bào vùng lũ một cách minh bạch và hiệu quả.
              </p>
              <div className="flex gap-3 mt-6">
                <a 
                  href="#facebook" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a 
                  href="#twitter" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <span className="text-sm font-bold">𝕏</span>
                </a>
                <a 
                  href="#youtube" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"
                  aria-label="Youtube"
                >
                  <span className="text-sm font-bold">▶</span>
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Liên kết nhanh</h4>
              <a href="/drms/donor" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Tìm điểm tập kết
              </a>
              <a href="/login" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Đăng nhập
              </a>
              <a href="#features" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Tính năng
              </a>
              <a href="#how-it-works" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Cách thức hoạt động
              </a>
              <a href="#contact" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Liên hệ
              </a>
            </div>

            {/* Column 3 - Support */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Hỗ trợ</h4>
              <a href="#faq" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Câu hỏi thường gặp
              </a>
              <a href="#guide" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Hướng dẫn sử dụng
              </a>
              <a href="#policy" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Chính sách & Quy định
              </a>
              <a href="#privacy" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Bảo mật thông tin
              </a>
              <a href="#terms" className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                Điều khoản sử dụng
              </a>
            </div>

            {/* Column 4 - Contact */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Liên hệ</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <p className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <a href="tel:19009300" className="hover:text-red-500 transition-colors duration-200">
                    Hotline: 1900 9300
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <a href="mailto:support@drms.vn" className="hover:text-red-500 transition-colors duration-200 break-all">
                    support@drms.vn
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>Hà Nội, Việt Nam</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-500">
                © 2025 DRMS - Disaster Relief Management System. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#privacy" className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                  Chính sách bảo mật
                </a>
                <a href="#terms" className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                  Điều khoản
                </a>
                <a href="#sitemap" className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DRMSLanding
