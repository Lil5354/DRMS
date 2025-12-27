import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from './dialog'
import { Button } from './button'
import { Badge } from './badge'

export function FilterDialog({ 
  open, 
  onClose, 
  onApply,
  filters,
  onFilterChange,
  type = 'donation' // 'donation', 'warehouse', 'sos', 'user'
}) {
  const handleReset = () => {
    if (type === 'donation') {
      onFilterChange({
        status: 'ALL',
        dateFrom: '',
        dateTo: '',
        warehouse: 'ALL'
      })
    } else if (type === 'warehouse') {
      onFilterChange({
        status: 'ALL',
        type: 'ALL'
      })
    } else if (type === 'sos') {
      onFilterChange({
        status: 'ALL',
        urgency: 'ALL'
      })
    } else if (type === 'user') {
      onFilterChange({
        role: 'ALL'
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader onClose={onClose}>
        <DialogTitle>Bộ lọc</DialogTitle>
        <DialogDescription>
          {type === 'donation' && 'Lọc danh sách quyên góp'}
          {type === 'warehouse' && 'Lọc danh sách điểm tập kết'}
          {type === 'sos' && 'Lọc yêu cầu SOS'}
          {type === 'user' && 'Lọc người dùng'}
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <div className="space-y-4">
          {type === 'donation' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="ALL">Tất cả</option>
                  <option value="REGISTERED">Chờ nhận</option>
                  <option value="RECEIVED">Đã nhận</option>
                  <option value="DISTRIBUTED">Đã phát</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Từ ngày
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đến ngày
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'warehouse' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="ALL">Tất cả</option>
                  <option value="OPEN">Đang mở</option>
                  <option value="FULL">Đã đầy</option>
                  <option value="CLOSED">Đã đóng</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại điểm
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="ALL">Tất cả</option>
                  <option value="CENTRAL_HUB">Kho Tổng</option>
                  <option value="COLLECTION_POINT">Điểm Gom</option>
                  <option value="DISTRIBUTION_POINT">Điểm Phát</option>
                </select>
              </div>
            </>
          )}

          {type === 'sos' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="ALL">Tất cả</option>
                  <option value="OPEN">Đang xử lý</option>
                  <option value="RESOLVED">Đã giải quyết</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mức độ khẩn cấp
                </label>
                <select
                  value={filters.urgency}
                  onChange={(e) => onFilterChange({ ...filters, urgency: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="ALL">Tất cả</option>
                  <option value="HIGH">Cao</option>
                  <option value="MEDIUM">Trung bình</option>
                  <option value="LOW">Thấp</option>
                </select>
              </div>
            </>
          )}

          {type === 'user' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vai trò
              </label>
              <select
                value={filters.role}
                onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="ALL">Tất cả</option>
                <option value="ADMIN">Quản trị viên</option>
                <option value="WAREHOUSE_MANAGER">Quản lý kho</option>
                <option value="DONOR">Người hảo tâm</option>
              </select>
            </div>
          )}

          {/* Active Filters Display */}
          <div className="pt-4 border-t">
            <p className="text-sm font-semibold text-gray-700 mb-2">Bộ lọc đang áp dụng:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (value && value !== 'ALL' && value !== '') {
                  return (
                    <Badge key={key} variant="outline" className="text-xs">
                      {key === 'status' && 'Trạng thái: '}
                      {key === 'type' && 'Loại: '}
                      {key === 'urgency' && 'Khẩn cấp: '}
                      {key === 'role' && 'Vai trò: '}
                      {key === 'dateFrom' && 'Từ: '}
                      {key === 'dateTo' && 'Đến: '}
                      {value}
                    </Badge>
                  )
                }
                return null
              })}
              {Object.values(filters).every(v => !v || v === 'ALL' || v === '') && (
                <span className="text-sm text-gray-500">Chưa có bộ lọc nào</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button variant="outline" onClick={handleReset}>
          Đặt lại
        </Button>
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={() => {
          onApply(filters)
          onClose()
        }}>
          Áp dụng
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
