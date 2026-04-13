import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import User from './User'
import Home from './Home'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User/>}/>
   <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App