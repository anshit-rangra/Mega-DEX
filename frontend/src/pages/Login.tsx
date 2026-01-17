import { useState } from "react";
import { loginUser } from "../api/auth/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
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
        <input type="text" name="username" value={form.username} onChange={handleChange}/>
        <br />
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        <br />
        <input type="submit" />    
    </form>
  )
}

export default Login