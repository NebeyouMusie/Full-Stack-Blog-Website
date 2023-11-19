import { useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useGlobalContext } from '../../context/context';
import './login.css'

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { isFetching, LoginStart, LoginSuccess, LoginFailure } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    LoginStart();

    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", { 
        username: userRef.current.value, 
        password : passwordRef.current.value
      }, { withCredentials: true });

      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      LoginSuccess(res.data);
      console.log(res.data);

    }catch(err){
      // dispatch({ type: "LOGIN_FAILURE" });
      LoginFailure();
    }
  }

  console.log(isFetching);

  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className="loginInput" 
          type="text" 
          placeholder='Enter your username'
          ref={userRef}
          />
        <label>Password</label>
        <input 
          className="loginInput"
          type="password" 
          placeholder='Enter your password'
          ref={passwordRef}
          />
        <button className="loginButton" type='submit' disabled={isFetching}>
          Login
        </button>
      </form>
      <Link to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  )
}
