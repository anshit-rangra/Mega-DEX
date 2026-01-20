import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import { useDispatch } from "react-redux"
import { registerTheUser } from "../store/slices/authSlice"

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
]

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const dispatch = useDispatch()

  const [form, setForm] = useState({
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

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedAvatar === null) {
      toast.error("Please select a profile picture")
      return
    }

    setIsLoading(true)
    const response: any = await dispatch(registerTheUser({
      ...form,
      profile: avatars[selectedAvatar]
    }) as any)
    setIsLoading(false)

    if(response?.payload?.status === 201) {
      setForm({username: "", password:""})
      setSelectedAvatar(null)
      toast.success(response.payload.data.message)
      navigate("/")
    } else {
      toast.error(response?.payload?.data.message)
    }
  }

  if (isLoading) return <Loader />
  
  return (
    <form onSubmit={handleSubmit} >
      <h2>Register User</h2>
      
      <label>Choose your avatar</label>
      <div className="avatar-selection">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`avatar-circle ${selectedAvatar === index ? 'selected' : ''}`}
            onClick={() => handleAvatarSelect(index)}
          >
            <img src={avatar} alt={`Avatar ${index + 1}`} />
          </div>
        ))}
      </div>

      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" placeholder="Choose a username" value={form.username} onChange={handleChange}  />
      <label htmlFor="password">Password</label>
      <div className="password-wrapper">
        <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Create a password" value={form.password} onChange={handleChange} />
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
      <input type="submit" value="Register" />
    </form>
  )
}

export default Register