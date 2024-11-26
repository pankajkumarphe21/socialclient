import { useEffect, useState } from 'react'
import './post.scss'
import axiosInstance from '../../axios'
import {Link, useNavigate} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { formatDistanceToNow } from "date-fns";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Post = ({data,handleDelete}) => {
  const [username,setUsername]=useState(null);
  const user=useSelector(state=>state.user.currentUser);
  const [liked,setLiked]=useState(false);
  const navigate=useNavigate();
  let date=formatDistanceToNow(
    data.date,
    {includeSeconds: true}
  );
  const handleEdit=()=>{
    navigate(`/post/edit/${data._id}`)
  }
  const handleLike=async()=>{
    await axiosInstance.post(`/post/like/${data._id}`);
    setLiked(!liked)
  };
  const isLiked=data.likes.filter((val)=>{
    return val===user._id;
  })
  useEffect(()=>{
    const fetchUser=async()=>{
      const user=await axiosInstance.get(`/auth/user/${data.userId}`)
      setUsername(user.data.username)
    };
    if(isLiked.length>0){
      setLiked(true);
    }
    fetchUser()
  },[username,isLiked]);
  return (
    <div className='post'>
      <div className="top">
        <Link className='username' to={`/profile/${username}`}>{username}</Link>
        <EditIcon onClick={handleEdit} className='edit'/>
        {username===user.username && <DeleteIcon onClick={handleDelete}/>}
      </div>
      <hr />
      <img height={'250'} src={`data:image/jpeg;base64,${data.base64Image}`} alt=''></img>
      <p>{data.desc}</p>
      <p>{date} ago</p>
      <div onClick={handleLike} className={`like ${liked ? 'yes' : ''}`}>
        { liked ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
      </div>
    </div>
  )
}

export default Post