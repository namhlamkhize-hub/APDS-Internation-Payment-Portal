import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/FormPages.css'
import { loginUser } from '../api/api'

const INITIAL = {
  username: '',
  accountNumber: '',
  password: '',
}

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm]             = useState(INITIAL)
  const [errors, setErrors]         = useState({})
  const [status, setStatus]         = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

 const validate = () => {
  const errs = {}
  if (!/^[A-Za-z0-9]+$/.test(form.username))
    errs.username = 'Username must be alphanumeric.'
  if (!/^[0-9]+$/.test(form.accountNumber))
    errs.accountNumber = 'Account number must be numeric.'
  if (!form.password)
    errs.password = 'Password is required.'
  return errs
} 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    setStatus(null)

    try {
      const data = await loginUser({ username: form.username, password: form.password })
      localStorage.setItem('token', data.token)
      setStatus('success')
      setTimeout(() => navigate('/payment'), 1500)
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <div className="form-header__icon" aria-hidden="true">🔐</div>
          <h1 className="form-header__title">Welcome Back</h1>
          <p className="form-header__subtitle">
            Sign in to your SecureBank account to continue
          </p>
        </div>

        {/* Status Alerts */}
        {status === 'success' && (
          <div className="alert alert--success" role="alert">
            ✓ Login successful! Redirecting…
          </div>
        )}
        {status === 'error' && (
          <div className="alert alert--error" role="alert">
            ✕ Invalid credentials. Please check and try again.
          </div>
        )}

        {/* Form */}
        <form className="form" onSubmit={handleSubmit} noValidate>

          <div className="field">
            <label className="field__label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={`field__input${errors.username ? ' error' : ''}`}
              placeholder="Your username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            {errors.username && (
              <span className="field__error">⚠ {errors.username}</span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="accountNumber">Account Number</label>
            <input
              id="accountNumber"
              name="accountNumber"
              type="text"
              inputMode="numeric"
              className={`field__input${errors.accountNumber ? ' error' : ''}`}
              placeholder="Your bank account number"
              value={form.accountNumber}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {errors.accountNumber && (
              <span className="field__error">⚠ {errors.accountNumber}</span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`field__input${errors.password ? ' error' : ''}`}
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            {errors.password && (
              <span className="field__error">⚠ {errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={submitting}
          >
            {submitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <div className="form-footer">
          Don't have an account?{' '}
          <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage