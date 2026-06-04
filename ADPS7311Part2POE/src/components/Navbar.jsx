import { NavLink, Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <Link to="/" className="navbar__brand" aria-label="SecureBank home">
        <div className="navbar__logo-icon" aria-hidden="true">S</div>
        <span className="navbar__brand-name">
          Secure<span>Bank</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="navbar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__link${isActive ? ' active' : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `navbar__link${isActive ? ' active' : ''}`
          }
        >
          Login
        </NavLink>

        <NavLink
          to="/payment"
          className={({ isActive }) =>
            `navbar__link${isActive ? ' active' : ''}`
          }
        >
          Payments
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `navbar__link navbar__cta${isActive ? ' active' : ''}`
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
