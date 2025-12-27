import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, X } from 'lucide-react'
import '../styles/QRScanner.css'

function QRScanner({ onScan, onClose }) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      console.log('Starting QR scanner...')
      
      const html5QrCode = new Html5Qrcode("qr-reader")
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
          // Ignore scan errors (these happen continuously while scanning)
        }
      )
      setIsScanning(true)
      console.log('Scanner started successfully')
    } catch (err) {
      console.error('Scanner error:', err)
      setError('Không thể truy cập camera. Vui lòng cho phép quyền camera.')
    }
  }

  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (isScanning) {
          await html5QrCodeRef.current.stop()
          console.log('Scanner stopped')
        }
        html5QrCodeRef.current = null
        setIsScanning(false)
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
    }
  }

  const handleClose = () => {
    stopScanning()
    onClose()
  }

  return (
    <div className="qr-scanner-overlay">
      <div className="qr-scanner-container">
        <div className="qr-scanner-header">
          <h3>Quét mã QR</h3>
          <button onClick={handleClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="qr-scanner-body">
          <div id="qr-reader" ref={scannerRef}></div>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {!isScanning && !error && (
            <div className="start-scan">
              <button onClick={startScanning} className="btn btn-primary">
                <Camera size={20} />
                Bật camera
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QRScanner
