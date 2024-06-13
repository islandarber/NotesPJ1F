import './App.css'
import { Notes } from './views/notes'
import {Navbar} from './views/navbar'
import {Routes, Route} from 'react-router-dom'	

function App() {


  return (
    <>
    <div className='page'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Notes />} />
      </Routes>
    </div>
    </>
  )
}

export default App
