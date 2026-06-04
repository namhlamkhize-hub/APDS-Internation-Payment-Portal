import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/FormPages.css'
import { submitPayment } from '../api/api'

const CURRENCIES = [
  'ZAR – South African Rand',
  'USD – US Dollar',
  'EUR – Euro',
  'GBP – British Pound',
  'JPY – Japanese Yen',
  'AUD – Australian Dollar',
  'CAD – Canadian Dollar',
  'CHF – Swiss Franc',
  'CNY – Chinese Yuan',
]

const PROVIDERS = [
  'ABSA Bank',
  'Standard Bank',
  'FNB – First National Bank',
  'Nedbank',
  'Capitec Bank',
  'Discovery Bank',
  'Investec',
  'HSBC',
  'Citibank',
  'Deutsche Bank',
  'Barclays',
]

const INITIAL = {
  amount: '',
  currency: '',
  provider: '',
  recipientName: '',
  recipientAccount: '',
  swiftCode: '',
  reference: '',
}

function PaymentPage() {
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
  if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
    errs.amount = 'Please enter a valid positive amount.'
  if (!form.currency)
    errs.currency = 'Please select a currency.'
  if (!form.provider)
    errs.provider = 'Please select a payment provider.'
  if (!/^[A-Za-z\s]+$/.test(form.recipientName.trim()))
    errs.recipientName = 'Recipient name must contain letters only.'
  if (!/^[0-9]+$/.test(form.recipientAccount))
    errs.recipientAccount = 'Account number must be numeric.'
  if (!/^[A-Z0-9]{8,11}$/.test(form.swiftCode.toUpperCase()))
    errs.swiftCode = 'Enter a valid SWIFT/BIC code (e.g. ABSAZAJJ).'
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
      await submitPayment({
        amount: form.amount,
        currency: form.currency,      // api.js strips it to "ZAR" etc.
        provider: form.provider,
        recipientAccount: form.recipientAccount,  // api.js maps to accountInfo
        swiftCode: form.swiftCode,
      })
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-page">
      <div className="form-card form-card--wide">
        {/* Header */}
        <div className="form-header">
          <div className="form-header__icon" aria-hidden="true">💸</div>
          <h1 className="form-header__title">Make a Payment</h1>
          <p className="form-header__subtitle">
            International SWIFT transfers — securely processed and tracked
          </p>
        </div>

        {/* Status Alerts */}
        {status === 'success' && (
          <div className="alert alert--success" role="alert">
            ✓ Payment submitted successfully! You will receive a confirmation shortly.
          </div>
        )}
        {status === 'error' && (
          <div className="alert alert--error" role="alert">
            ✕ Payment failed. Please review your details and try again.
          </div>
        )}

        {/* Form */}
        <form className="form" onSubmit={handleSubmit} noValidate>

          {/* Transfer Amount */}
          <div className="form-section-label">Transfer Amount</div>

          <div className="form-row">
            <div className="field">
              <label className="field__label" htmlFor="amount">Amount</label>
              <input
                id="amount"
                name="amount"
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                className={`field__input${errors.amount ? ' error' : ''}`}
                placeholder="0.00"
                value={form.amount}
                onChange={handleChange}
                required
              />
              {errors.amount && (
                <span className="field__error">⚠ {errors.amount}</span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="currency">Currency</label>
              <div className="field__select-wrapper">
                <select
                  id="currency"
                  name="currency"
                  className={`field__select${errors.currency ? ' error' : ''}`}
                  value={form.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select currency</option>
                  {CURRENCIES.map(c => (
                    <option key={c} value={c.split(' ')[0]}>{c}</option>
                  ))}
                </select>
              </div>
              {errors.currency && (
                <span className="field__error">⚠ {errors.currency}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="provider">Payment Provider</label>
            <div className="field__select-wrapper">
              <select
                id="provider"
                name="provider"
                className={`field__select${errors.provider ? ' error' : ''}`}
                value={form.provider}
                onChange={handleChange}
                required
              >
                <option value="">Select provider / bank</option>
                {PROVIDERS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            {errors.provider && (
              <span className="field__error">⚠ {errors.provider}</span>
            )}
          </div>

          {/* Recipient Details */}
          <div className="form-section-label" style={{ marginTop: '8px' }}>
            Recipient Details
          </div>

          <div className="field">
            <label className="field__label" htmlFor="recipientName">Recipient Full Name</label>
            <input
              id="recipientName"
              name="recipientName"
              type="text"
              className={`field__input${errors.recipientName ? ' error' : ''}`}
              placeholder="Account holder name"
              value={form.recipientName}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {errors.recipientName && (
              <span className="field__error">⚠ {errors.recipientName}</span>
            )}
          </div>

          <div className="form-row">
            <div className="field">
              <label className="field__label" htmlFor="recipientAccount">
                Recipient Account Number
              </label>
              <input
                id="recipientAccount"
                name="recipientAccount"
                type="text"
                inputMode="numeric"
                className={`field__input${errors.recipientAccount ? ' error' : ''}`}
                placeholder="IBAN or account number"
                value={form.recipientAccount}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              {errors.recipientAccount && (
                <span className="field__error">⚠ {errors.recipientAccount}</span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="swiftCode">SWIFT / BIC Code</label>
              <input
                id="swiftCode"
                name="swiftCode"
                type="text"
                maxLength={11}
                className={`field__input${errors.swiftCode ? ' error' : ''}`}
                placeholder="e.g. ABSAZAJJ"
                value={form.swiftCode}
                onChange={handleChange}
                autoComplete="off"
                required
                style={{ textTransform: 'uppercase' }}
              />
              {errors.swiftCode && (
                <span className="field__error">⚠ {errors.swiftCode}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="reference">
              Payment Reference <span style={{ color: 'var(--clr-text-faint)', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="reference"
              name="reference"
              type="text"
              className="field__input"
              placeholder="Invoice number, note, etc."
              value={form.reference}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={submitting}
          >
            {submitting ? 'Processing Payment…' : 'Submit Payment'}
          </button>
        </form>

        <div className="form-footer">
          Need to update your account?{' '}
          <Link to="/register">Register</Link>
          {' · '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage