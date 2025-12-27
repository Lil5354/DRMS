import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Package, QrCode } from 'lucide-react'
import QRGenerator from '../components/QRGenerator'
import '../styles/QRGenerator.css'

function QRGenerate() {
  const [trackingCode, setTrackingCode] = useState('')
  const [generatedQR, setGeneratedQR] = useState(null)

  const handleGenerate = (e) => {
    e.preventDefault()
    if (trackingCode.trim()) {
      setGeneratedQR({
        code: trackingCode,
        label: `Mã tracking: ${trackingCode}`
      })
    }
  }

  const generateRandomCode = () => {
    const code = `TRK${Math.floor(100000 + Math.random() * 900000)}`
    setTrackingCode(code)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/warehouse" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tạo mã QR</h1>
                <p className="text-sm text-gray-500">Tạo mã QR cho lô hàng</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {!generatedQR ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Nhập thông tin lô hàng</h2>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã tracking
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      placeholder="VD: TRK001234"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateRandomCode}
                      className="btn btn-secondary"
                    >
                      Tạo tự động
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Lưu ý
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Mã tracking phải là duy nhất cho mỗi lô hàng</li>
                    <li>• Sau khi tạo, bạn có thể in hoặc tải xuống mã QR</li>
                    <li>• Người quyên góp sẽ dùng mã này để check-in tại kho</li>
                  </ul>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <QrCode size={20} />
                  Tạo mã QR
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <QRGenerator 
                data={generatedQR.code}
                label={generatedQR.label}
              />
              <button
                onClick={() => {
                  setGeneratedQR(null)
                  setTrackingCode('')
                }}
                className="btn btn-secondary w-full"
              >
                Tạo mã khác
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QRGenerate
