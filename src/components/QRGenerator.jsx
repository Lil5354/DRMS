import React, { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, Printer } from 'lucide-react'

function QRGenerator({ data, label }) {
  const qrRef = useRef(null)

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `QR-${data}.png`
    link.href = url
    link.click()
  }

  const printQR = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>In mã QR - ${data}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            .qr-print {
              text-align: center;
              padding: 2rem;
            }
            img {
              max-width: 400px;
              margin: 1rem 0;
            }
            h2 {
              margin: 0.5rem 0;
            }
            p {
              color: #666;
              margin: 0.5rem 0;
            }
          </style>
        </head>
        <body>
          <div class="qr-print">
            <h2>${label || 'Mã QR'}</h2>
            <img src="${url}" alt="QR Code" />
            <p><strong>${data}</strong></p>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="qr-generator">
      <div className="qr-display" ref={qrRef}>
        <QRCodeCanvas 
          value={data} 
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>
      {label && <p className="qr-label">{label}</p>}
      <p className="qr-data">{data}</p>
      <div className="qr-actions">
        <button onClick={downloadQR} className="btn btn-secondary">
          <Download size={18} />
          Tải xuống
        </button>
        <button onClick={printQR} className="btn btn-primary">
          <Printer size={18} />
          In mã QR
        </button>
      </div>
    </div>
  )
}

export default QRGenerator
