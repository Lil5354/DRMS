import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from './dialog'
import { Button } from './button'

export const ConfirmDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = 'Xác nhận', 
  description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'destructive' // 'destructive' | 'default'
}) => {
  return (
    <Dialog open={open} onClose={onClose} zIndex="z-[60]">
      <DialogHeader onClose={onClose}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            variant === 'destructive' ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <AlertTriangle className={`w-6 h-6 ${
              variant === 'destructive' ? 'text-red-600' : 'text-blue-600'
            }`} strokeWidth={1.5} />
          </div>
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <DialogContent>
        <div className={`p-4 rounded-lg ${
          variant === 'destructive' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          <p className={`text-sm ${
            variant === 'destructive' ? 'text-red-800' : 'text-blue-800'
          }`}>
            {variant === 'destructive' 
              ? 'Hành động này không thể hoàn tác. Vui lòng xác nhận để tiếp tục.'
              : 'Vui lòng xác nhận để tiếp tục.'}
          </p>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button 
          variant="outline"
          onClick={onClose}
        >
          {cancelText}
        </Button>
        <Button
          variant={variant === 'destructive' ? 'destructive' : 'default'}
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmText}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
