import { useState } from 'react';
import axiosInstance from '../../axios';
import './login.scss'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../../features/current/currentUserSlice';

const Login = () => {
  const [data,setData]=useState({
    username:'',
    password:''
  });
  const [err,setErr]=useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      console.log(data)
      const user=await axiosInstance.post('/auth/login',data);
      const userdata=user.data._doc
      setErr(user.data._doc)
      // dispatch(updateUser(userdata));
      // navigate(`/`);
      // setErr(null)
    } catch (error) {
      setErr(error.response.data);
    }
  }
  const handleChange=(e)=>{
    setData((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  return (
    <div className='login'>
      <div className="child">
        <div className="left">
          <img src="https://plus.unsplash.com/premium_photo-1684979564941-dbf8664a68fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29jaWFsfGVufDB8fDB8fHww" alt="" />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" required onChange={handleChange} placeholder='Enter username' />
            <input type="password" name="password" required onChange={handleChange} placeholder='Enter password' />
            {err ? err : ''}
            <button>Login</button>
          </form>
          <div className='registerdiv'><p>Don't have an account?</p> <button onClick={()=>navigate('/register')}>Register</button></div>
        </div>
      </div>
    </div>
  )
}

export default Login