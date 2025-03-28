import React from 'react'
import { Link } from 'react-router-dom'
import '../css/index.css'

const Footer = () => {
  return (
    <footer>
      <span className='copyright'>
      Copyright © 2023 Okampany</span>
    
      <div className='footer-social'>
      <Link to='/'><i className="fa-brands fa-facebook-f"></i></Link>
        </div>
    </footer>
    
  )
}

export default Footer