import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles }) {
  const userStr = localStorage.getItem('user')
  
  if (!userStr) {
    // Chưa đăng nhập -> redirect về login
    return <Navigate to="/login" replace />
  }

  const user = JSON.parse(userStr)

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Không có quyền truy cập -> redirect về trang phù hợp với role
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/drms/admin" replace />
      case 'WAREHOUSE_MANAGER':
        return <Navigate to="/drms/warehouse" replace />
      case 'DONOR':
        return <Navigate to="/drms/donor" replace />
      default:
        return <Navigate to="/login" replace />
    }
  }

  return children
}

export default ProtectedRoute
