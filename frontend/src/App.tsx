import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Pool from './pages/Pool'
import MyAccount from './pages/MyAccount'

const App = () => {
  const token = document.cookie.includes("authToken") || localStorage.getItem("auth-token")

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        {
        !token ? 
        <>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        </>
        :
        <>
        <Route path='/pool/:id' element={<Pool />} />
        <Route path='/my-account' element={<MyAccount />} />
        </>
        }
      </Routes>
    </>
  )
}

export default App