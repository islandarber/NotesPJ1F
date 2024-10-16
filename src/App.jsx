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
          {/* Handle root "/" path based on user login status */}
          <Route path="/" element={token ? <Navigate to="/notes" /> : <HomePage />} />
          
          {/* Public routes, accessible when user is NOT logged in */}
          {publicRoutes.map(({path, element}) => (
            <Route key={path} path={path} element={!token ? element : <Navigate to='/'/>} />))
          }

          {/* Private routes, accessible when user is logged in */}
          {privateRoutes.map(({path, element}) => (
            <Route key={path} path={path} element={token ? element : <Navigate to='/login'/>} />))
          }

          {/* Other Routes */}
          <Route path="/not-found" element={<Notfound />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<ResetPasswordForm />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default App
