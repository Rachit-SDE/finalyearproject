import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import { Routes, Route, BrowserRouter } from 'react-router-dom'


const Dashboard = ({children}) => {

  const {user} = useSelector(state => state.users)

  return (
    <div className='layout'>
      <div className='sidebar-box'>
        <Sidebar/>
      </div>
      <div className='main-page'>
      {children}
      </div>
    </div>
  )
}

export default Dashboard
