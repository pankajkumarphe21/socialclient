import { useEffect, useState } from 'react'
import './post.scss'
import axiosInstance from '../../axios'
import {Link, useNavigate} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

const Post = ({data,handleDelete}) => {
  const [username,setUsername]=useState(null);
  const user=useSelector(state=>state.user.currentUser);
  const navigate=useNavigate();
  const handleEdit=()=>{
    navigate(`/post/edit/${data._id}`)
  }
  useEffect(()=>{
    const fetchUser=async()=>{
      const user=await axiosInstance.get(`/auth/user/${data.userId}`)
      setUsername(user.data.username)
    }
    fetchUser()
  },[username])
  return (
    <div className='post'>
      <div className="top">
        <Link className='username' to={`/profile/${username}`}>{username}</Link>
        {/* <EditIcon onClick={handleEdit} className='edit'/> */}
      </div>
      <hr />
      <img height={'250'} src={`data:image/jpeg;base64,${data.base64Image}`} alt=''></img>
      <p>{data.desc}</p>
      {username===user.username && <DeleteIcon onClick={handleDelete}/>}
    </div>
  )
}

export default Post