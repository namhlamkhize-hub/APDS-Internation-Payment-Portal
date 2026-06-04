import { Link } from 'react-router-dom'

const heroStyles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: '-10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '400px',
    background: 'radial-gradient(ellipse, rgba(200,170,100,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    background: 'rgba(200,170,100,0.1)',
    border: '1px solid rgba(200,170,100,0.25)',
    borderRadius: '100px',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--clr-gold)',
    marginBottom: '32px',
    animation: 'cardEntrance 0.4s ease both',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--clr-gold)',
    animation: 'pulse 2s ease infinite',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.4rem, 6vw, 4rem)',
    fontWeight: 700,
    color: 'var(--clr-text)',
    lineHeight: 1.1,
    marginBottom: '20px',
    maxWidth: '680px',
    animation: 'cardEntrance 0.5s 0.1s ease both',
    opacity: 0,
    animationFillMode: 'forwards',
  },
  accent: {
    background: 'linear-gradient(135deg, var(--clr-gold), var(--clr-gold-light))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'var(--clr-text-muted)',
    maxWidth: '520px',
    lineHeight: 1.7,
    marginBottom: '48px',
    animation: 'cardEntrance 0.5s 0.2s ease both',
    opacity: 0,
    animationFillMode: 'forwards',
  },
  actions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    animation: 'cardEntrance 0.5s 0.3s ease both',
    opacity: 0,
    animationFillMode: 'forwards',
  },
  btnPrimary: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, var(--clr-gold), var(--clr-gold-light))',
    color: '#0a0d14',
    borderRadius: '6px',
    fontWeight: 700,
    fontSize: '0.9rem',
    letterSpacing: '0.04em',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'inline-block',
  },
  btnSecondary: {
    padding: '14px 32px',
    background: 'transparent',
    color: 'var(--clr-text)',
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '0.9rem',
    letterSpacing: '0.04em',
    textDecoration: 'none',
    border: '1px solid var(--clr-border)',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    display: 'inline-block',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    maxWidth: '720px',
    width: '100%',
    marginTop: '80px',
    animation: 'cardEntrance 0.5s 0.4s ease both',
    opacity: 0,
    animationFillMode: 'forwards',
  },
  featureCard: {
    background: 'var(--clr-surface)',
    border: '1px solid var(--clr-border)',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'left',
  },
  featureIcon: {
    fontSize: '24px',
    marginBottom: '12px',
    display: 'block',
  },
  featureTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--clr-text)',
    marginBottom: '6px',
  },
  featureText: {
    fontSize: '0.83rem',
    color: 'var(--clr-text-muted)',
    lineHeight: 1.6,
  },
}

const FEATURES = [
  { icon: '🔐', title: 'Bank-Grade Security', text: 'End-to-end encrypted transactions and multi-factor authentication.' },
  { icon: '💸', title: 'Global Payments', text: 'Send funds worldwide with SWIFT transfers to 180+ countries.' },
  { icon: '⚡', title: 'Instant Processing', text: 'Real-time payment tracking and same-day settlement options.' },
]

function HomePage() {
  return (
    <div style={heroStyles.page}>
      <div style={heroStyles.glow} />

      <div style={heroStyles.tag}>
        <span style={heroStyles.dot} />
        Customer Portal
      </div>

      <h1 style={heroStyles.title}>
        Banking built for{' '}
        <span style={heroStyles.accent}>the modern world</span>
      </h1>

      <p style={heroStyles.subtitle}>
        Secure international payments, seamless account management, and
        real-time transaction tracking — all in one place.
      </p>

      <div style={heroStyles.actions}>
        <Link
          to="/register"
          style={heroStyles.btnPrimary}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,170,100,0.35)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Open Account
        </Link>
        <Link
          to="/login"
          style={heroStyles.btnSecondary}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(200,170,100,0.4)'
            e.currentTarget.style.color = 'var(--clr-gold)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--clr-border)'
            e.currentTarget.style.color = 'var(--clr-text)'
          }}
        >
          Sign In
        </Link>
      </div>

      <div style={heroStyles.features}>
        {FEATURES.map(f => (
          <div key={f.title} style={heroStyles.featureCard}>
            <span style={heroStyles.featureIcon}>{f.icon}</span>
            <div style={heroStyles.featureTitle}>{f.title}</div>
            <div style={heroStyles.featureText}>{f.text}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default HomePage
