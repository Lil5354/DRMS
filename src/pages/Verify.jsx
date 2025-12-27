import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, CheckCircle } from 'lucide-react'
import '../styles/Auth.css'

function Verify() {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus()
    }
    setError('')
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const verifyCode = code.join('')
    
    if (verifyCode.length !== 6) {
      setError('Vui lòng nhập đủ 6 số')
      return
    }

    // Mock verification
    alert('Xác thực thành công!')
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Shield size={48} className="verify-icon" />
          <h1>Xác thực tài khoản</h1>
          <p>Nhập mã 6 số đã được gửi đến email của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={error ? 'error' : ''}
              />
            ))}
          </div>
          {error && <span className="error-message">{error}</span>}

          <button type="submit" className="btn btn-primary btn-full">
            <CheckCircle size={20} />
            Xác thực
          </button>

          <button type="button" className="btn-link" onClick={() => alert('Đã gửi lại mã')}>
            Gửi lại mã
          </button>
        </form>
      </div>
    </div>
  )
}

export default Verify
