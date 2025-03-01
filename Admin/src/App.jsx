import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addbus from './pages/Addbus'
import './App.css'
import Home from './pages/Home'
import Allbus from './pages/Allbus'

const App = () => {
  return (
    <div className='main'>
      <Navbar/>
      <div className='main-inner'>
        <div className='main-left'>
        <Sidebar/>
        </div>
        <div className='main-right'>
        <Routes>
          <Route path='/' element={ <Home/>}/> 
          <Route path='/addbus' element={ <Addbus/>}/>
          <Route path='/allbus' element={ <Allbus/>}/>
        </Routes>
        </div>

      </div>
    </div>
  )
}

export default App

