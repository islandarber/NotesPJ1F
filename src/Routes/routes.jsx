import { Notes } from '../views/notes'
import { DNotes } from '../views/dnotes'
import { Home } from '../views/Home'
import { Login } from '../views/Login'
import { Register } from '../views/Register'

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login />},
  { path: 'signup', element: <Register />},
];

export const privateRoutes = [
  { path:'notes', element: <Notes />},
  { path:'deleted', element: <DNotes />},
  { path:''}
];