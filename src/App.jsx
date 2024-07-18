import './App.css'
import { Notes } from './views/notes'
import {Navbar} from './views/navbar'
import {Routes, Route} from 'react-router-dom'	
import { DNotes } from './views/dnotes'
import { Home } from './views/Home'
import {Footer} from './views/Footer'

function App() {


  return (
    <>
    <div id="root">
      {/* <Navbar/> */}
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/deleted" element={<DNotes />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default App
