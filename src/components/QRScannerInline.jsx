import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, X, AlertCircle } from 'lucide-react'

function QRScannerInline({ onScan, onError }) {
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const html5QrCodeRef = useRef(null)

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      setIsLoading(true)
      console.log('Starting inline QR scanner...')
      
      const html5QrCode = new Html5Qrcode("qr-reader-inline")
      html5QrCodeRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          console.log('QR Code detected:', decodedText)
          onScan(decodedText)
          stopScanning()
        },
        (errorMessage) => {
          // Ignore continuous scan errors
        }
      )
      setIsScanning(true)
      setIsLoading(false)
      console.log('Inline scanner started successfully')
    } catch (err) {
      console.error('Scanner error:', err)
      const errorMsg = 'Không thể truy cập camera. Vui lòng cho phép quyền camera.'
      setError(errorMsg)
      setIsLoading(false)
      if (onError) onError(errorMsg)
    }
  }

  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (isScanning) {
          await html5QrCodeRef.current.stop()
          console.log('Inline scanner stopped')
        }
        html5QrCodeRef.current = null
        setIsScanning(false)
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
    }
  }

  return (
    <div className="qr-scanner-inline" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div 
        id="qr-reader-inline" 
        style={{ 
          borderRadius: '12px',
          overflow: 'hidden',
          width: '100%',
          minHeight: isScanning ? 'auto' : '0',
          opacity: isScanning ? 1 : 0,
          transform: isScanning ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'center'
        }}
      ></div>
      
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <AlertCircle size={20} color="#dc2626" />
          <p style={{ margin: 0, color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>
        </div>
      )}

      {!isScanning && !error && (
        <div style={{ 
          textAlign: 'center',
          animation: isLoading ? 'none' : 'fadeIn 0.3s ease-out'
        }}>
          <button 
            onClick={startScanning} 
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? (
              <>
                <div className="spinner" style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></div>
                Đang mở camera...
              </>
            ) : (
              <>
                <Camera size={20} />
                Bật camera
              </>
            )}
          </button>
        </div>
      )}

      {isScanning && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.3s ease-out 0.2s backwards'
        }}>
          <button 
            onClick={stopScanning}
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <X size={18} />
            Dừng quét
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default QRScannerInline
