import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Pool = lazy(() => import('./pages/Pool'))
const MyAccount = lazy(() => import('./pages/MyAccount'))
const CreatePool = lazy(() => import('./pages/CreatePool'))
const UserAccount = lazy(() => import('./pages/UserAccount'))

const App = () => {
 
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)

  return (
    <>
    <Navbar />
    <Suspense fallback={<Loader />}>
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
    </Suspense>
    </>
  )
}

export default App