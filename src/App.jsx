import './styles/App.css'

import { Route, Routes } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import UnprotectedRoute from './components/UnprotectedRoute'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Signup from './pages/Signup'
function App() {
  return (
    <Routes>
      <Route element={<UnprotectedRoute />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/' element={<Home />} />
      <Route path='/product/:productId' element={<Product />} />
      <Route element={<AuthRoute />}>
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
