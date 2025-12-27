/**
 * DRMS Backend Server
 * Server chính để xử lý các API requests, đặc biệt là tạo mã QR từ tracking ID
 */

const express = require('express');
const cors = require('cors');
const qrRoutes = require('./routes/qr');
require('dotenv').config();

// Khởi tạo Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Cho phép CORS từ frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DRMS Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/qr', qrRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} không tồn tại`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DRMS Backend Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 QR Code API: http://localhost:${PORT}/api/qr/:trackingId`);
});

module.exports = app;

