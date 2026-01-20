import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Pool from './pages/Pool'
import MyAccount from './pages/MyAccount'
import CreatePool from './pages/CreatePool'
import UserAccount from './pages/UserAccount'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'

const App = () => {
 
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find/user' element={<UserAccount />} />
        <Route path='/pool/:id' element={<Pool />} />

        {
        isAuthenticated ? 
        <>
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/create/pool' element={<CreatePool />} />
        </>
        :
        <>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        </>
        
        }
      </Routes>
    </>
  )
}

export default App