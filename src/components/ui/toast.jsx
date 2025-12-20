import toast, { Toaster } from 'react-hot-toast'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

// Custom toast wrapper with icons
export const useToast = () => {
  return {
    success: (message, duration = 3000) => {
      toast.success(message, {
        duration,
        icon: <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={1.5} />,
        style: {
          background: '#f0fdf4',
          border: '2px solid #86efac',
          padding: '16px',
          color: '#166534',
          fontWeight: '500',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      })
    },
    error: (message, duration = 3000) => {
      toast.error(message, {
        duration,
        icon: <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={1.5} />,
        style: {
          background: '#fef2f2',
          border: '2px solid #fca5a5',
          padding: '16px',
          color: '#991b1b',
          fontWeight: '500',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      })
    },
    warning: (message, duration = 3000) => {
      toast(message, {
        duration,
        icon: <AlertTriangle className="w-5 h-5 text-amber-600" strokeWidth={1.5} />,
        style: {
          background: '#fffbeb',
          border: '2px solid #fcd34d',
          padding: '16px',
          color: '#92400e',
          fontWeight: '500',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      })
    },
    info: (message, duration = 3000) => {
      toast(message, {
        duration,
        icon: <Info className="w-5 h-5 text-blue-600" strokeWidth={1.5} />,
        style: {
          background: '#eff6ff',
          border: '2px solid #93c5fd',
          padding: '16px',
          color: '#1e40af',
          fontWeight: '500',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      })
    },
  }
}

// Toast Provider component
export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          bottom: 40,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            minWidth: '300px',
            maxWidth: '500px',
          },
        }}
      />
    </>
  )
}
