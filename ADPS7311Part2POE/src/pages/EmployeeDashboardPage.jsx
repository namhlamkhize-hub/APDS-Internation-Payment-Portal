import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/FormPages.css'
import { getAllPayments, verifyPayment } from '../api/api'

function EmployeeDashboardPage() {
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [verifyingId, setVerifyingId] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
  }, [navigate])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      setError(null)
      setStatusMessage(null)
      const data = await getAllPayments()
      setPayments(Array.isArray(data) ? data : data.payments || [])
    } catch (err) {
      setError(err.message || 'Failed to load payments')
      // If unauthorized, redirect to login
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const handleVerify = async (paymentId) => {
    try {
      setVerifyingId(paymentId)
      setStatusMessage(null)
      await verifyPayment(paymentId)
      // Update the payment status locally
      setPayments(prevPayments =>
        prevPayments.map(payment =>
          payment._id === paymentId ? { ...payment, verified: true } : payment
        )
      )
      setStatusMessage({ type: 'success', text: 'Payment verified successfully!' })
      // Clear success message after 3 seconds
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to verify payment: ' + (err.message || 'Unknown error') })
      setTimeout(() => setStatusMessage(null), 5000)
    } finally {
      setVerifyingId(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="form-page">
      <div className="form-card form-card--wide" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="form-header">
          <div className="form-header__icon" aria-hidden="true">👨‍💼</div>
          <h1 className="form-header__title">Employee Dashboard</h1>
          <p className="form-header__subtitle">
            Manage and verify customer payments
          </p>
        </div>

        {/* Status Messages */}
        {statusMessage && (
          <div 
            className={`alert alert--${statusMessage.type}`} 
            role="alert"
            style={{ marginBottom: '16px' }}
          >
            {statusMessage.type === 'success' ? '✓' : '✕'} {statusMessage.text}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="alert alert--error" role="alert">
            ✕ {error}
            <button 
              onClick={fetchPayments}
              style={{
                marginLeft: 'auto',
                padding: '4px 12px',
                background: 'transparent',
                border: '1px solid var(--clr-error)',
                borderRadius: '4px',
                color: 'var(--clr-error)',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: 'var(--clr-text-muted)' 
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
            <div style={{ fontSize: '1rem' }}>Loading payments...</div>
          </div>
        )}

        {/* Payments Table */}
        {!loading && !error && (
          <>
            {/* Stats Bar */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={statCardStyle}>
                <div style={statNumberStyle}>{payments.length}</div>
                <div style={statLabelStyle}>Total Payments</div>
              </div>
              <div style={statCardStyle}>
                <div style={{ ...statNumberStyle, color: 'var(--clr-success)' }}>
                  {payments.filter(p => p.verified).length}
                </div>
                <div style={statLabelStyle}>Verified</div>
              </div>
              <div style={statCardStyle}>
                <div style={{ ...statNumberStyle, color: 'var(--clr-error)' }}>
                  {payments.filter(p => !p.verified).length}
                </div>
                <div style={statLabelStyle}>Pending</div>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--clr-border)' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.875rem',
                color: 'var(--clr-text)'
              }}>
                <thead>
                  <tr style={{
                    background: 'var(--clr-surface-2)',
                    borderBottom: '2px solid var(--clr-border)',
                    textAlign: 'left'
                  }}>
                    <th style={tableHeaderStyle}>Amount</th>
                    <th style={tableHeaderStyle}>Currency</th>
                    <th style={tableHeaderStyle}>Provider</th>
                    <th style={tableHeaderStyle}>Account</th>
                    <th style={tableHeaderStyle}>SWIFT</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{
                        padding: '48px 20px',
                        textAlign: 'center',
                        color: 'var(--clr-text-muted)'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</div>
                        <div>No payments found</div>
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment._id} style={{
                        borderBottom: '1px solid var(--clr-border)',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,170,100,0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={tableCellStyle}>
                          <span style={{ fontWeight: 600 }}>
                            {payment.amount?.toLocaleString()}
                          </span>
                        </td>
                        <td style={tableCellStyle}>{payment.currency}</td>
                        <td style={tableCellStyle}>{payment.provider}</td>
                        <td style={tableCellStyle}>{payment.accountInfo}</td>
                        <td style={tableCellStyle}>
                          <code style={{
                            background: 'var(--clr-surface-2)',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '0.8rem'
                          }}>
                            {payment.swiftCode}
                          </code>
                        </td>
                        <td style={tableCellStyle}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: payment.verified 
                              ? 'rgba(76, 175, 120, 0.15)' 
                              : 'rgba(224, 92, 92, 0.15)',
                            color: payment.verified 
                              ? 'var(--clr-success)' 
                              : 'var(--clr-error)',
                            border: payment.verified 
                              ? '1px solid rgba(76, 175, 120, 0.3)' 
                              : '1px solid rgba(224, 92, 92, 0.3)'
                          }}>
                            {payment.verified ? '✓ Verified' : '⨯ Pending'}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <button
                            onClick={() => handleVerify(payment._id)}
                            disabled={payment.verified || verifyingId === payment._id}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '6px',
                              border: payment.verified 
                                ? '1px solid var(--clr-border)' 
                                : '1px solid var(--clr-gold)',
                              background: payment.verified 
                                ? 'transparent' 
                                : 'linear-gradient(135deg, var(--clr-gold), var(--clr-gold-light))',
                              color: payment.verified 
                                ? 'var(--clr-text-muted)' 
                                : '#0a0d14',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: (payment.verified || verifyingId === payment._id) ? 'not-allowed' : 'pointer',
                              opacity: (payment.verified || verifyingId === payment._id) ? 0.5 : 1,
                              transition: 'all 0.2s ease',
                              whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                              if (!payment.verified && verifyingId !== payment._id) {
                                e.currentTarget.style.transform = 'translateY(-1px)'
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(200,170,100,0.3)'
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)'
                              e.currentTarget.style.boxShadow = 'none'
                            }}
                          >
                            {verifyingId === payment._id 
                              ? 'Verifying...' 
                              : payment.verified 
                                ? 'Verified' 
                                : 'Verify'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              marginTop: '24px', 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={fetchPayments}
                style={{
                  padding: '10px 24px',
                  background: 'transparent',
                  border: '1px solid var(--clr-border)',
                  borderRadius: '6px',
                  color: 'var(--clr-text)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--clr-gold)'
                  e.currentTarget.style.color = 'var(--clr-gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--clr-border)'
                  e.currentTarget.style.color = 'var(--clr-text)'
                }}
              >
                ↻ Refresh Payments
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 24px',
                  background: 'transparent',
                  border: '1px solid rgba(224, 92, 92, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--clr-error)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(224, 92, 92, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const statCardStyle = {
  flex: '1',
  minWidth: '120px',
  padding: '16px',
  background: 'var(--clr-surface-2)',
  border: '1px solid var(--clr-border)',
  borderRadius: '8px',
  textAlign: 'center'
}

const statNumberStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  fontFamily: 'var(--font-display)',
  color: 'var(--clr-gold)',
  marginBottom: '4px'
}

const statLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--clr-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em'
}

const tableHeaderStyle = {
  padding: '14px 16px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--clr-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  whiteSpace: 'nowrap'
}

const tableCellStyle = {
  padding: '14px 16px',
  whiteSpace: 'nowrap'
}

export default EmployeeDashboardPage