import React, { useState } from 'react'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import profilePic from '/src/assets/nm.png'
import { useGlobalContext } from '../../context/context'
import axios from 'axios'

export default function Settings() {
  const {
          user,
          UpdateStart,
          UpdateSuccess,
          UpdateFailure,
          DeleteUser
        } = useGlobalContext();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";


  const handleSubmit = async (e) => {
    e.preventDefault();
    UpdateStart();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try{
        await axios.post("http://localhost:5000/api/upload", data, { withCredentials: true });
      }catch(err){
        console.log(err);
      }
    }
    try{
      const res = await axios.put("http://localhost:5000/api/users/"+ user._id, updatedUser, { withCredentials: true });
      setSuccess(true);
      UpdateSuccess(res.data);
    }catch(err){
      UpdateFailure();
      console.log(err);
    }
  }


  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:5000/api/users/${user._id}`, {data: {userId: user._id}}, { withCredentials: true });
      DeleteUser();
      window.location.replace("/"); 
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span 
            className="settingsDeleteTitle"
            onClick={handleDelete}
            >Delete Your Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}> 
          <label htmlFor="">Profile Picture</label>
          <div className="settingsPP">
            <img className="profilePic" src={file ? URL.createObjectURL(file): PF + user.profilePic} alt="Profile Picture" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-user-pen"></i>
            </label>
            <input 
              type="file" 
              id='fileInput' 
              style={{display: "none"}}
              onChange={(e) => setFile(e.target.files[0])}
              />
          </div>
          <label>Username</label>
          <input 
            type="text" 
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <label>Email</label>
          <input 
            type="email" 
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <label>Password</label>
          <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
          <button 
            className="settingsSubmit"
            type='submit'
            >Update</button>
            {success && <span style={{color: "green", textAlign: "center", marginTop: "10px"}}>Profile has been updated.</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
