import './styles/App.css'

import { Route, Routes } from 'react-router-dom'

// import AuthRoute from './components/AuthRoute'
import UnprotectedRoute from './components/UnprotectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {
  return (
    <Routes>
      <Route element={<UnprotectedRoute />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
