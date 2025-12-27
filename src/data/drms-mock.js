// Mock data cho DRMS System

export const warehouses = [
  {
    id: 'hub-001',
    name: 'Kho Tổng Quận Hoàn Kiếm',
    type: 'CENTRAL_HUB',
    location: { lat: 21.0285, lng: 105.8542 },
    address: 'Số 1 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội',
    capacity: 1000,
    currentLoad: 650,
    status: 'OPEN',
    manager: 'Nguyễn Văn A',
    phone: '0912345678',
    acceptedItems: ['Thực phẩm', 'Nước uống', 'Thuốc men', 'Quần áo'],
    openHours: '24/7'
  },
  {
    id: 'hub-002',
    name: 'Điểm Tập Kết Đống Đa',
    type: 'COLLECTION_POINT',
    location: { lat: 21.0245, lng: 105.8412 },
    address: 'Nhà văn hóa phường Láng Hạ, Đống Đa',
    capacity: 500,
    currentLoad: 320,
    status: 'OPEN',
    manager: 'Trần Thị B',
    phone: '0923456789',
    acceptedItems: ['Thực phẩm', 'Nước uống', 'Quần áo'],
    openHours: '6:00 - 22:00'
  },
  {
    id: 'hub-003',
    name: 'Kho Cầu Giấy',
    type: 'DISTRIBUTION_POINT',
    location: { lat: 21.0333, lng: 105.7942 },
    address: 'Trường THPT Cầu Giấy, Cầu Giấy',
    capacity: 800,
    currentLoad: 780,
    status: 'FULL',
    manager: 'Lê Văn C',
    phone: '0934567890',
    acceptedItems: ['Thực phẩm', 'Nước uống', 'Thuốc men'],
    openHours: '7:00 - 20:00'
  },
  {
    id: 'hub-004',
    name: 'Điểm Tiếp Nhận Hai Bà Trưng',
    type: 'COLLECTION_POINT',
    location: { lat: 21.0122, lng: 105.8516 },
    address: 'UBND Phường Bạch Đằng, Hai Bà Trưng',
    capacity: 400,
    currentLoad: 150,
    status: 'OPEN',
    manager: 'Phạm Thị D',
    phone: '0945678901',
    acceptedItems: ['Thực phẩm', 'Nước uống', 'Đồ dùng học tập'],
    openHours: '8:00 - 18:00'
  },
  {
    id: 'hub-005',
    name: 'Kho Tây Hồ',
    type: 'CENTRAL_HUB',
    location: { lat: 21.0583, lng: 105.8194 },
    address: 'Nhà thi đấu Tây Hồ, Tây Hồ',
    capacity: 1200,
    currentLoad: 450,
    status: 'OPEN',
    manager: 'Hoàng Văn E',
    phone: '0956789012',
    acceptedItems: ['Thực phẩm', 'Nước uống', 'Thuốc men', 'Quần áo', 'Chăn màn'],
    openHours: '24/7'
  }
]

export const donations = [
  // Hub-001 donations
  {
    id: 'don-001',
    donorName: 'Công ty TNHH ABC',
    donorPhone: '0987654321',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Gạo', quantity: 100, unit: 'kg' },
      { name: 'Mì tôm', quantity: 500, unit: 'gói' }
    ],
    status: 'RECEIVED',
    registeredAt: '2024-12-15T08:30:00',
    receivedAt: '2024-12-15T10:00:00',
    trackingCode: 'TRK001234'
  },
  {
    id: 'don-002',
    donorName: 'Nguyễn Thị X',
    donorPhone: '0976543210',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Nước suối', quantity: 50, unit: 'thùng' },
      { name: 'Bánh mì', quantity: 100, unit: 'ổ' }
    ],
    status: 'REGISTERED',
    registeredAt: '2024-12-16T14:20:00',
    trackingCode: 'TRK001235'
  },
  {
    id: 'don-003',
    donorName: 'Trần Văn Y',
    donorPhone: '0965432109',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Quần áo cũ', quantity: 200, unit: 'bộ' },
      { name: 'Chăn', quantity: 50, unit: 'cái' }
    ],
    status: 'DISTRIBUTED',
    registeredAt: '2024-12-14T09:00:00',
    receivedAt: '2024-12-14T11:00:00',
    distributedAt: '2024-12-15T16:00:00',
    trackingCode: 'TRK001236'
  },
  {
    id: 'don-004',
    donorName: 'Lê Thị Mai',
    donorPhone: '0954321098',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Thuốc men', quantity: 20, unit: 'hộp' },
      { name: 'Băng gạc', quantity: 100, unit: 'cuộn' }
    ],
    status: 'RECEIVED',
    registeredAt: '2024-12-16T09:00:00',
    receivedAt: '2024-12-16T11:30:00',
    trackingCode: 'TRK001237'
  },
  {
    id: 'don-005',
    donorName: 'Phạm Văn Hùng',
    donorPhone: '0943210987',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Sữa hộp', quantity: 200, unit: 'hộp' },
      { name: 'Bánh quy', quantity: 150, unit: 'gói' }
    ],
    status: 'REGISTERED',
    registeredAt: '2024-12-17T08:00:00',
    trackingCode: 'TRK001238'
  },
  {
    id: 'don-006',
    donorName: 'Hoàng Thị Lan',
    donorPhone: '0932109876',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Áo mưa', quantity: 100, unit: 'cái' },
      { name: 'Ủng cao su', quantity: 50, unit: 'đôi' }
    ],
    status: 'DISTRIBUTED',
    registeredAt: '2024-12-13T10:00:00',
    receivedAt: '2024-12-13T14:00:00',
    distributedAt: '2024-12-14T09:00:00',
    trackingCode: 'TRK001239'
  },
  {
    id: 'don-007',
    donorName: 'Nguyễn Văn Đức',
    donorPhone: '0921098765',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Nến', quantity: 500, unit: 'cây' },
      { name: 'Diêm', quantity: 200, unit: 'hộp' },
      { name: 'Pin', quantity: 300, unit: 'viên' }
    ],
    status: 'RECEIVED',
    registeredAt: '2024-12-16T15:00:00',
    receivedAt: '2024-12-16T17:00:00',
    trackingCode: 'TRK001240'
  },
  {
    id: 'don-008',
    donorName: 'Trần Thị Hoa',
    donorPhone: '0910987654',
    targetWarehouseId: 'hub-001',
    items: [
      { name: 'Chăn ấm', quantity: 80, unit: 'cái' },
      { name: 'Gối', quantity: 80, unit: 'cái' }
    ],
    status: 'REGISTERED',
    registeredAt: '2024-12-17T10:00:00',
    trackingCode: 'TRK001241'
  },
  // Hub-002 donations
  {
    id: 'don-009',
    donorName: 'Công ty XYZ',
    donorPhone: '0909876543',
    targetWarehouseId: 'hub-002',
    items: [
      { name: 'Gạo', quantity: 200, unit: 'kg' },
      { name: 'Dầu ăn', quantity: 50, unit: 'chai' }
    ],
    status: 'RECEIVED',
    registeredAt: '2024-12-15T07:00:00',
    receivedAt: '2024-12-15T09:00:00',
    trackingCode: 'TRK001242'
  },
  {
    id: 'don-010',
    donorName: 'Lê Văn Tùng',
    donorPhone: '0898765432',
    targetWarehouseId: 'hub-002',
    items: [
      { name: 'Nước lọc', quantity: 100, unit: 'thùng' }
    ],
    status: 'DISTRIBUTED',
    registeredAt: '2024-12-14T08:00:00',
    receivedAt: '2024-12-14T10:00:00',
    distributedAt: '2024-12-15T14:00:00',
    trackingCode: 'TRK001243'
  }
]

export const sosRequests = [
  {
    id: 'sos-001',
    location: 'Ngõ 123 Trần Hưng Đạo, Hoàn Kiếm',
    description: 'Khu vực bị ngập nặng, cần hỗ trợ khẩn cấp',
    affectedPeople: 25,
    urgency: 'HIGH',
    contactPhone: '0912111111',
    status: 'OPEN',
    createdAt: '2024-12-17T07:00:00'
  },
  {
    id: 'sos-002',
    location: 'Số 45 Láng Hạ, Đống Đa',
    description: 'Thiếu thuốc men và vật tư y tế',
    affectedPeople: 15,
    urgency: 'MEDIUM',
    contactPhone: '0923222222',
    status: 'OPEN',
    createdAt: '2024-12-16T15:30:00'
  },
  {
    id: 'sos-003',
    location: 'Phường Bạch Đằng, Hai Bà Trưng',
    description: 'Cần hỗ trợ thực phẩm cho người già',
    affectedPeople: 8,
    urgency: 'LOW',
    contactPhone: '0934567890',
    status: 'RESOLVED',
    createdAt: '2024-12-15T10:00:00'
  }
]

export const warehouseTypes = {
  CENTRAL_HUB: { label: 'Kho Tổng', color: '#dc2626', iconName: 'Building2' },
  COLLECTION_POINT: { label: 'Điểm Gom Hàng', color: '#f59e0b', iconName: 'Package' },
  DISTRIBUTION_POINT: { label: 'Điểm Phát', color: '#3b82f6', iconName: 'Truck' }
}

export const warehouseStatuses = {
  OPEN: { label: 'Đang mở', color: '#10b981' },
  FULL: { label: 'Đã đầy', color: '#ef4444' },
  CLOSED: { label: 'Đã đóng', color: '#6b7280' }
}

export const donationStatuses = {
  REGISTERED: { label: 'Đã đăng ký', color: '#3b82f6' },
  RECEIVED: { label: 'Đã nhập kho', color: '#f59e0b' },
  DISTRIBUTED: { label: 'Đã phát', color: '#10b981' }
}

export const users = [
  {
    id: 'user-001',
    email: 'admin@drms.vn',
    role: 'ADMIN',
    name: 'Admin System'
  },
  {
    id: 'user-002',
    email: 'manager1@drms.vn',
    role: 'WAREHOUSE_MANAGER',
    name: 'Nguyễn Văn A',
    warehouseId: 'hub-001'
  },
  {
    id: 'user-003',
    email: 'donor@gmail.com',
    role: 'DONOR',
    name: 'Người Hảo Tâm'
  }
]
