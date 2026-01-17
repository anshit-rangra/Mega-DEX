import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Pool from './pages/Pool'
import MyAccount from './pages/MyAccount'
import CreatePool from './pages/CreatePool'
import UserAccount from './pages/UserAccount'
import Navbar from './components/Navbar'

const App = () => {
  const token = document.cookie.includes("authToken") || localStorage.getItem("auth-token")

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find/user' element={<UserAccount />} />

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
        <Route path='/create/pool' element={<CreatePool />} />
        </>
        }
      </Routes>
    </>
  )
}

export default App