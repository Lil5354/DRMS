/**
 * API Configuration
 * Cấu hình URL cho các API endpoints
 */

// Backend API URL - có thể thay đổi theo môi trường
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// QR Code API endpoints
export const QR_API = {
  // Tạo QR code image (PNG/SVG)
  generate: (trackingId, options = {}) => {
    const { format = 'png', size = 300, margin = 2 } = options;
    return `${API_BASE_URL}/api/qr/${trackingId}?format=${format}&size=${size}&margin=${margin}`;
  },
  
  // Lấy QR code dưới dạng data URL (base64)
  getDataUrl: (trackingId, options = {}) => {
    const { size = 300, margin = 2 } = options;
    return `${API_BASE_URL}/api/qr/${trackingId}/data?size=${size}&margin=${margin}`;
  },
  
  // Tạo nhiều QR code cùng lúc
  batch: () => `${API_BASE_URL}/api/qr/batch`,
  
  // Health check
  health: () => `${API_BASE_URL}/health`
};

