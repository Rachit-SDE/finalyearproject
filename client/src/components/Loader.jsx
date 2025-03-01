import React from 'react'
import { assets } from '../assets/assets'
import '../resources/global.css'

const Loader = () => {
  return (
    <div className='spinner-parent'>
      <img src={assets.busjourney} alt="" className='spinner' />
    </div>
  )
}

export default Loader
