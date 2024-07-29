import './App.css'
import { privateRoutes, publicRoutes } from './Routes/routes'
import {Routes, Route} from 'react-router-dom'
import { Notfound } from './views/Notfound'
import { useAuth } from './Context/AuthContext'
import { Navbar } from './views/navbar'
import { Footer } from './views/Footer'
import { Navigate } from 'react-router-dom'
import { ResetPassword } from './views/PasswordReset'
import {ResetPasswordForm} from './views/ResetPasswordForm'

function App() {

  const {token} = useAuth()
  return (
    <>
    <div id="root">
     {token ? <Navbar/> : null}
      <div className='main-content'>
        <Routes>
          {publicRoutes.map(({path, element}) => (
            <Route key={path} path={path} element={!token ? element : <Navigate to='/'/>} />))
          }
          {privateRoutes.map(({path, element}) => (
            <Route key={path} path={path} element={token ? element : <Navigate to='/login'/>} />))
          }
          <Route path="/not-found" element={<Notfound />} />
          <Route path="*" element={<Navigate to="/not-found" replace/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<ResetPasswordForm />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default App
