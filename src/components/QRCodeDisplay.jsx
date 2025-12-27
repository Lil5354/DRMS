/**
 * QRCodeDisplay Component
 * Component để hiển thị QR code từ tracking ID
 */

import React, { useState, useEffect } from 'react';
import { QrCode, Download, Loader2, AlertCircle } from 'lucide-react';
import { QR_API } from '../lib/apiConfig';

/**
 * @param {string} trackingId - Mã tracking (ví dụ: TRK001235)
 * @param {number} size - Kích thước QR code (default: 200)
 * @param {boolean} showDownload - Hiển thị nút download (default: true)
 * @param {string} className - CSS classes bổ sung
 * @param {function} onError - Callback khi có lỗi
 */
function QRCodeDisplay({ 
  trackingId, 
  size = 200, 
  showDownload = true,
  className = '',
  onError 
}) {
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackingId) {
      setError('Không có mã tracking');
      setLoading(false);
      return;
    }

    // Fetch QR code từ API
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = QR_API.getDataUrl(trackingId, { size, margin: 2 });
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setQrDataUrl(data.dataUrl);
      } catch (err) {
        console.error('Error fetching QR code:', err);
        const errorMessage = 'Không thể tải mã QR. Vui lòng kiểm tra kết nối server.';
        setError(errorMessage);
        if (onError) {
          onError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, [trackingId, size, onError]);

  // Download QR code
  const handleDownload = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qr-${trackingId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg ${className}`}>
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
        <p className="text-sm text-gray-600">Đang tạo mã QR...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg border border-red-200 ${className}`}>
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-sm text-red-600 text-center">{error}</p>
        <p className="text-xs text-red-500 mt-1">Mã: {trackingId}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
        {qrDataUrl ? (
          <img 
            src={qrDataUrl} 
            alt={`QR Code - ${trackingId}`}
            className="w-full h-full"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ) : (
          <div 
            className="flex items-center justify-center bg-gray-100"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      
      {trackingId && (
        <p className="text-xs text-gray-600 mt-2 font-mono">{trackingId}</p>
      )}
      
      {showDownload && qrDataUrl && (
        <button
          onClick={handleDownload}
          className="mt-2 px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
        >
          <Download className="w-3 h-3" />
          Tải xuống
        </button>
      )}
    </div>
  );
}

export default QRCodeDisplay;

