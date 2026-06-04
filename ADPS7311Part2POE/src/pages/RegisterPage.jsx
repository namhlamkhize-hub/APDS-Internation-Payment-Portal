import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/FormPages.css'
import { registerUser } from '../api/api'

const INITIAL = {
  fullName: '',
  idNumber: '',
  accountNumber: '',
  username: '',
  password: '',
  confirmPassword: '',
}

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm]         = useState(INITIAL)
  const [errors, setErrors]     = useState({})
  const [status, setStatus]     = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

 const validate = () => {
  const errs = {}
  if (!/^[A-Za-z\s]+$/.test(form.fullName.trim()))
    errs.fullName = 'Full name must contain letters only.'
  if (!/^\d{13}$/.test(form.idNumber))
    errs.idNumber = 'ID number must be exactly 13 digits.'
  if (!/^[0-9]+$/.test(form.accountNumber))
    errs.accountNumber = 'Account number must be numeric.'
  if (!/^[A-Za-z0-9]+$/.test(form.username))
    errs.username = 'Username must be alphanumeric.'
  if (form.password.length < 6)
    errs.password = 'Password must be at least 6 characters.'
  if (form.password !== form.confirmPassword)
    errs.confirmPassword = 'Passwords do not match.'
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
      await registerUser({
        fullName: form.fullName,
        idNumber: form.idNumber,
        accountNumber: form.accountNumber,
        username: form.username,
        password: form.password,
      })
      setStatus('success')
      setForm(INITIAL)
      setTimeout(() => navigate('/login'), 2000)
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
          <div className="form-header__icon" aria-hidden="true">👤</div>
          <h1 className="form-header__title">Create Account</h1>
          <p className="form-header__subtitle">
            Register for your SecureBank customer portal access
          </p>
        </div>

        {/* Status Alerts */}
        {status === 'success' && (
          <div className="alert alert--success" role="alert">
            ✓ Account created successfully! Redirecting to login…
          </div>
        )}
        {status === 'error' && (
          <div className="alert alert--error" role="alert">
            ✕ Registration failed. Please try again.
          </div>
        )}

        {/* Form */}
        <form className="form" onSubmit={handleSubmit} noValidate>

          {/* Personal Information */}
          <div className="form-section-label">Personal Information</div>

          <div className="field">
            <label className="field__label" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`field__input${errors.fullName ? ' error' : ''}`}
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            {errors.fullName && (
              <span className="field__error">⚠ {errors.fullName}</span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="idNumber">ID Number</label>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              inputMode="numeric"
              maxLength={13}
              className={`field__input${errors.idNumber ? ' error' : ''}`}
              placeholder="13-digit South African ID"
              value={form.idNumber}
              onChange={handleChange}
              required
            />
            {errors.idNumber && (
              <span className="field__error">⚠ {errors.idNumber}</span>
            )}
          </div>

          {/* Account Details */}
          <div className="form-section-label" style={{ marginTop: '8px' }}>
            Account Details
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
            <label className="field__label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={`field__input${errors.username ? ' error' : ''}`}
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            {errors.username && (
              <span className="field__error">⚠ {errors.username}</span>
            )}
          </div>

          <div className="form-row">
            <div className="field">
              <label className="field__label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`field__input${errors.password ? ' error' : ''}`}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              {errors.password && (
                <span className="field__error">⚠ {errors.password}</span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`field__input${errors.confirmPassword ? ' error' : ''}`}
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              {errors.confirmPassword && (
                <span className="field__error">⚠ {errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={submitting}
          >
            {submitting ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div className="form-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage