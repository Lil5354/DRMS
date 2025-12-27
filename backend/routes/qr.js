/**
 * QR Code Routes
 * Xử lý các request liên quan đến tạo mã QR từ tracking ID
 */

const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

/**
 * GET /api/qr/:trackingId
 * Tạo mã QR từ tracking ID và trả về dưới dạng image (PNG)
 * 
 * Query parameters:
 * - format: 'png' (default) hoặc 'svg' - định dạng trả về
 * - size: số (default: 300) - kích thước QR code (pixels)
 * - margin: số (default: 2) - margin của QR code
 * 
 * @param {string} trackingId - Mã tracking (ví dụ: TRK001235)
 */
router.get('/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const { format = 'png', size = 300, margin = 2 } = req.query;

    // Validate tracking ID
    if (!trackingId || trackingId.trim() === '') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Tracking ID không được để trống'
      });
    }

    // Validate format
    const validFormats = ['png', 'svg'];
    if (!validFormats.includes(format.toLowerCase())) {
      return res.status(400).json({
        error: 'Bad Request',
        message: `Format không hợp lệ. Chỉ chấp nhận: ${validFormats.join(', ')}`
      });
    }

    // Validate size
    const qrSize = parseInt(size);
    if (isNaN(qrSize) || qrSize < 100 || qrSize > 2000) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Size phải là số từ 100 đến 2000 pixels'
      });
    }

    // Validate margin
    const qrMargin = parseInt(margin);
    if (isNaN(qrMargin) || qrMargin < 0 || qrMargin > 10) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Margin phải là số từ 0 đến 10'
      });
    }

    // Tạo nội dung cho QR code (có thể là tracking ID hoặc URL)
    // Nếu muốn tạo URL để tracking, có thể dùng: `${process.env.FRONTEND_URL}/track/${trackingId}`
    const qrData = trackingId.trim();

    // Tùy chọn cho QR code
    const qrOptions = {
      errorCorrectionLevel: 'M', // Mức độ sửa lỗi: L, M, Q, H
      type: format === 'svg' ? 'svg' : 'image/png',
      quality: 0.92,
      margin: qrMargin,
      color: {
        dark: '#000000', // Màu đen cho các điểm QR
        light: '#FFFFFF' // Màu trắng cho nền
      },
      width: qrSize
    };

    // Generate QR code
    if (format.toLowerCase() === 'svg') {
      // Trả về SVG
      const svgString = await QRCode.toString(qrData, {
        type: 'svg',
        errorCorrectionLevel: qrOptions.errorCorrectionLevel,
        margin: qrOptions.margin,
        color: qrOptions.color,
        width: qrOptions.width
      });

      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Content-Disposition', `inline; filename="qr-${trackingId}.svg"`);
      res.send(svgString);
    } else {
      // Trả về PNG
      const qrBuffer = await QRCode.toBuffer(qrData, qrOptions);

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `inline; filename="qr-${trackingId}.png"`);
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 giờ
      res.send(qrBuffer);
    }

  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Không thể tạo mã QR. Vui lòng thử lại sau.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/qr/:trackingId/data
 * Trả về dữ liệu QR code dưới dạng base64 (để embed trong HTML)
 * 
 * Response: { dataUrl: string, trackingId: string }
 */
router.get('/:trackingId/data', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const { size = 300, margin = 2 } = req.query;

    // Validate tracking ID
    if (!trackingId || trackingId.trim() === '') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Tracking ID không được để trống'
      });
    }

    // Validate size
    const qrSize = parseInt(size);
    if (isNaN(qrSize) || qrSize < 100 || qrSize > 2000) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Size phải là số từ 100 đến 2000 pixels'
      });
    }

    // Validate margin
    const qrMargin = parseInt(margin);
    if (isNaN(qrMargin) || qrMargin < 0 || qrMargin > 10) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Margin phải là số từ 0 đến 10'
      });
    }

    const qrData = trackingId.trim();

    // Generate QR code as data URL (base64)
    const dataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: qrMargin,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: qrSize
    });

    res.json({
      success: true,
      trackingId: trackingId,
      dataUrl: dataUrl,
      format: 'png',
      size: qrSize
    });

  } catch (error) {
    console.error('Error generating QR code data:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Không thể tạo mã QR. Vui lòng thử lại sau.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/qr/batch
 * Tạo nhiều QR code cùng lúc từ danh sách tracking IDs
 * 
 * Body: { trackingIds: string[], size?: number, margin?: number }
 * Response: { qrCodes: Array<{ trackingId: string, dataUrl: string }> }
 */
router.post('/batch', async (req, res) => {
  try {
    const { trackingIds, size = 300, margin = 2 } = req.body;

    // Validate input
    if (!Array.isArray(trackingIds) || trackingIds.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'trackingIds phải là một mảng không rỗng'
      });
    }

    if (trackingIds.length > 50) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Tối đa 50 tracking IDs mỗi lần request'
      });
    }

    // Validate size
    const qrSize = parseInt(size);
    if (isNaN(qrSize) || qrSize < 100 || qrSize > 2000) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Size phải là số từ 100 đến 2000 pixels'
      });
    }

    // Validate margin
    const qrMargin = parseInt(margin);
    if (isNaN(qrMargin) || qrMargin < 0 || qrMargin > 10) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Margin phải là số từ 0 đến 10'
      });
    }

    // Generate QR codes for all tracking IDs
    const qrCodes = await Promise.all(
      trackingIds.map(async (trackingId) => {
        try {
          const qrData = trackingId.trim();
          const dataUrl = await QRCode.toDataURL(qrData, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
            quality: 0.92,
            margin: qrMargin,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            width: qrSize
          });

          return {
            trackingId: trackingId,
            dataUrl: dataUrl,
            success: true
          };
        } catch (error) {
          return {
            trackingId: trackingId,
            success: false,
            error: error.message
          };
        }
      })
    );

    res.json({
      success: true,
      count: qrCodes.length,
      qrCodes: qrCodes
    });

  } catch (error) {
    console.error('Error generating batch QR codes:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Không thể tạo mã QR. Vui lòng thử lại sau.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

