import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TechRegister from './pages/tech-register/TechRegister'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='min-h-[80vh]'>
          <Routes>
            <Route path='/' element={<TechRegister/>}/>
            <Route path='/technician/register' element={<TechRegister/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
