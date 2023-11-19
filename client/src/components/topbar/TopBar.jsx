import React from 'react'
import "./topbar.css"
// import image from "/src/assets/nm.png"
import { NavLink, Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/context'

export default function TopBar() {
  const { user, Logout } =useGlobalContext();
  const PF = "http://localhost:5000/images/";
  const style = {
    color: "lightblue",
  }

 

  return (
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>  
        <i className="topIcon fa-brands fa-square-x-twitter"></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className='topList'>
          <li>
            <NavLink style={({isActive}) => isActive ? style: null } className='topListItem' to="/">HOME</NavLink>
          </li>
          {/* <li >
            <NavLink className='topListItem' to="/">ABOUT</NavLink>
          </li> */}
          <li >
            <NavLink style={({isActive}) => isActive ? style: null }
            className='topListItem' to="/write">WRITE</NavLink>
          </li>
          {/* <li >
            <NavLink 
            className='topListItem' to="/">CONTACT</NavLink>
          </li> */}
          {user && <li >
            <NavLink className='topListItem' to="/" onClick={Logout}>LOGOUT</NavLink>
          </li>}
        </ul>
      </div>
      <div className="topRight">
      {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <NavLink 
                className="link" to="/login"
                style={({isActive}) => isActive ? style: null }
              >
                LOGIN
              </NavLink>
            </li>
            <li className="topListItem">
              <NavLink 
                className="link" 
                to="/register"
                style={({isActive}) => isActive ? style: null }
                >
                REGISTER
              </NavLink>
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
      </div>
    </div>
  )
}
