import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TechRegister from './pages/tech-register/TechRegister'
import Login from './pages/login/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='min-h-[80vh]'>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/technician/register' element={<TechRegister/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
