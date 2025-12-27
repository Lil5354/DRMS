import React from 'react'
import { X } from 'lucide-react'

export const Dialog = ({ open, onClose, children, zIndex = 'z-50' }) => {
  if (!open) return null

  return (
    <div className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4 animate-fade-in`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        {children}
      </div>
    </div>
  )
}

export const DialogHeader = ({ children, onClose }) => {
  return (
    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export const DialogTitle = ({ children }) => {
  return <h2 className="text-2xl font-bold text-gray-900">{children}</h2>
}

export const DialogDescription = ({ children }) => {
  return <p className="text-sm text-gray-600 mt-1">{children}</p>
}

export const DialogContent = ({ children }) => {
  return <div className="px-6 py-4">{children}</div>
}

export const DialogFooter = ({ children }) => {
  return (
    <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex items-center justify-end gap-3">
      {children}
    </div>
  )
}
