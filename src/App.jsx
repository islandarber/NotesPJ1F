import './App.css'
import { Notes } from './views/notes'
import {Routes, Route} from 'react-router-dom'	

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Notes />} />
    </Routes>
    </>
  )
}

export default App
