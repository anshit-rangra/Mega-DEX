import { useNavigate } from "react-router-dom"


const Navbar = () => {
      const token = document.cookie.includes("authToken") || localStorage.getItem("auth-token")
      const navigate = useNavigate()

      function handleClick(e: any) {
        const target = e.target as HTMLElement
        const path = target.dataset.path
        if (path) {
          navigate(path)
        }
      }

  return (
    <div>
        <ul onClick={handleClick}>
            <li data-path="/">Home</li>
            <li data-path="/find/user">users</li>
            {
                token ? 
                <>
                <li data-path='/my-account'>My account</li>
                </>
                :
                <>
                <li data-path='/login'>Login</li>
                <li data-path='/register'>Register</li>
                </>
            }
        </ul>
    </div>
  )
}

export default Navbar