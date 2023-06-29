import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Favourite from './Components/Favourite'
import Nav from './Components/Nav'
import Home from './Components/Home'

const App= ()=> {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/fav' element={<Favourite/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
 export default App