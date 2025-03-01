import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    useEffect(()=> {
        if(localStorage.getItem('token')){
        }
    })
  return (
    <div>
      {children}
    </div>
  )
}

export default PublicRoute
