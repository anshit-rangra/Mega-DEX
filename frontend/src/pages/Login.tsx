import { useState } from "react";
import { loginUser } from "../api/auth/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [form , setForm] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setIsLoading(true)
    const response = await loginUser(form)
    setIsLoading(false)
    
    if(response?.status === 200){
        setForm({username:"", password:""})
        toast.success(response.data.message)
        navigate("/");
    }else {
        
        toast.error(response.data.message)
    }
  };



  if (isLoading) return <Loader />

  return (
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Enter your username" value={form.username} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
          <button type="button" className="password-toggle" onClick={togglePassword} aria-label="Toggle password visibility">
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        <input type="submit" value="Login" />    
    </form>
  )
}

export default Login