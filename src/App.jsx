import './App.css'
import { Notes } from './views/notes'
import {Navbar} from './views/navbar'
import {Routes, Route} from 'react-router-dom'	
import { DNotes } from './views/dnotes'

function App() {


  return (
    <>
    <div className='page'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/deleted" element={<DNotes />} />
      </Routes>
    </div>
    </>
  )
}

export default App
