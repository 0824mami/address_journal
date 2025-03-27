import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const Footer = () => {
  return (
    <footer>
      <span className='copyright'>Copyright 2025</span>
    
    <div className='footer-social'>
      <Link to='/'><i className='fab-f-facebook-f'></i></Link>
        </div>
    </footer>
    
  )
}

export default Footer