import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TechRegister from './pages/tech-register/TechRegister'
import Login from './pages/login/Login'
import CustomerRegister from './pages/customer-register/CustomerRegister'
import ServiceOrderCreate from './pages/service-order-create/ServiceOrderCreate'
import TechDashboard from './pages/tech-dashboard/TechDashboard'
import NeogenNavbar from './components/navbar/NeogenNavbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <NeogenNavbar />
        <div className='min-h-[80vh]'>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/technician/dashboard' element={<TechDashboard/>}/>
            <Route path='/technician/register' element={<TechRegister/>}/>
            <Route path='/customers/register' element={<CustomerRegister/>}/>
            <Route path='/service-orders/create' element={<ServiceOrderCreate/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
