import { useEffect, useState } from 'react'
import './post.scss'
import axiosInstance from '../../axios'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

const Post = ({data,handleDelete}) => {
  const [username,setUsername]=useState(null);
  const user=useSelector(state=>state.user.currentUser);
  useEffect(()=>{
    const fetchUser=async()=>{
      const user=await axiosInstance.get(`/auth/user/${data.userId}`)
      setUsername(user.data.username)
    }
    fetchUser()
  },[username])
  return (
    <div>
      <Link to={`/profile/${username}`}>{username}</Link>
      <hr />
      <img height={'100'} src={`data:image/jpeg;base64,${data.base64Image}`} alt=''></img>
      <p>{data.desc}</p>
      {username===user.username && <DeleteIcon onClick={handleDelete}/>}
    </div>
  )
}

export default Post