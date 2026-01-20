import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/slices/authSlice"


const Navbar = () => {
      const token = document.cookie.includes("authToken") || localStorage.getItem("auth-token")
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const [isMenuOpen, setIsMenuOpen] = useState(false)

      function handleClick(e: any) {
        const target = e.target as HTMLElement
        const path = target.dataset.path
        if (path) {
          navigate(path)
          setIsMenuOpen(false)
        }
      }

      function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
      }

      function handleLogout() {
        // Remove from localStorage
        localStorage.removeItem("auth-token")
        
        // Remove authToken cookie by setting it to expire in the past
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        
        setIsMenuOpen(false)
        navigate('/login')
        dispatch(logout())
      }

  return (
    <nav>
        <div className="nav-brand" onClick={() => navigate('/')}>
          <span className="logo">DEX</span>
        </div>
        
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'} onClick={handleClick}>
            <li data-path="/">Home</li>
            <li data-path="/find/user">Users</li>
            {
                token ? 
                <>
                <li data-path='/my-account'>My Account</li>
                {/* <li data-path='/create/pool'>Create Pool</li> */}
                <li className="logout-btn" onClick={handleLogout}>Logout</li>
                </>
                :
                <>
                <li data-path='/login'>Login</li>
                <li data-path='/register'>Register</li>
                </>
            }
        </ul>
    </nav>
  )
}

export default Navbar