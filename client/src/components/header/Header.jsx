import React from 'react'
import './header.css'
import headerImage from '/src/assets/low-poly-grid-haikei.svg'

export default function Header() {
  return (
    <header className='header'>
      <div className="headerTitles">
        <span className='headerTitleSm'>Tech Geek</span>
        <span className='headerTitleLg'>Blog</span>
      </div>
      <img 
        className='headerImg'
        src={headerImage} 
        alt="Header Image" />
    </header>
  )
}
