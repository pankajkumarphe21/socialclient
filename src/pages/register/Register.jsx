import React, { useState } from 'react'
import './register.scss'
import axiosInstance from '../../axios'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { updateUser } from '../../features/current/currentUserSlice'

const Register = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [err,setErr]=useState(null);
  const handleClick=async(e)=>{
    e.preventDefault();
    try {
      const user= await axiosInstance.post('/auth/register',data);
      const userdata=user.data._doc
      dispatch(updateUser(userdata));
      navigate(`/`);
      setErr(null);
    } catch (error) {
      setErr(error.response.data);
    }
  }
  const [data,setData]=useState({
    username:'',
    fullname:'',
    password:''
  });
  const handleChange=(e)=>{
    setData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  return (
    <div className='register'>
      <div className="child">
        <div className="left">
          <img src="https://plus.unsplash.com/premium_photo-1684979564941-dbf8664a68fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29jaWFsfGVufDB8fDB8fHww" alt="" />
        </div>
        <div className="right">
          <form onSubmit={handleClick}>
            <input type="text" name="username" required onChange={handleChange} placeholder='Enter username' />
            <input type="password" name="password" required onChange={handleChange} placeholder='Enter password' />
            <input type="text" name="fullname" required onChange={handleChange} placeholder='Enter fullname' />
            {err ? err : ''}
            <button>Register</button>
          </form>
          <div className='logindiv'><p> Already have an account?</p> <button onClick={()=>navigate('/login')}>Login</button></div>
        </div>
      </div>
    </div>
  )
}

export default Register