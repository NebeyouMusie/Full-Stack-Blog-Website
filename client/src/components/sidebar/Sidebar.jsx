import React, { useEffect, useState } from 'react'
import './sidebar.css'
import image from '/src/assets/image2.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCats(res.data);
    };

    getCats();
  }, [])

  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className='sidebarTitle'>ABOUT ME</span>
        <img className="sidebarImage" src={image} alt="about me image" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores in quam pariatur.</p>
      </div>

      <div className="sidebarItem">
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'> 
         {cats.map(cat => {
          return (
          <Link to={`/?cat=${cat.name}`} className='link' key={cat._id}>
            <li className="sidebarListItem">{cat.name}</li>
          </Link>
          );
         })}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>  
          <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
          <i className="sidebarIcon fa-brands fa-linkedin"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  )
}
