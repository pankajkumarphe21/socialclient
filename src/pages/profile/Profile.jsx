import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import EditIcon from '@mui/icons-material/Edit';
import './profile.scss'
import axiosInstance from '../../axios'
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/post/Post";
import { updateUser } from "../../features/current/currentUserSlice";

const Profile = () => {
  let {username} = useParams();
  const [profilePic,setProfilePic]=useState(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isFollowed,setIsFollowed]=useState(false);
  const [file,setFile]=useState(null);
  const authUser=useSelector(state=>state.user.currentUser.username);
  const authUserId=useSelector(state=>state.user.currentUser._id);
  const userId=useSelector(state=>state.user.currentUser._id)
  const [posts,setPosts]=useState([]);
  const [refresh, setRefresh] = useState(false);
  const [err,setErr]=useState(null);
  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
  }
  const handleDelete=async(id)=>{
    await axiosInstance.delete(`/post/delete/${id}`);
    setRefresh((prev) => !prev);
  }
  const formData=new FormData();
  formData.append('pic',file);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const d=await axiosInstance.post(`/auth/pic/${userId}`,formData);
      dispatch(updateUser(d.data));
    } catch (error) {
      setErr(error.response.data);
    }
  }
  const handleFollow=async()=>{
    try {
      const data=await axiosInstance.post(`/auth/follow/${username}`);
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const user=await axiosInstance.get(`/auth/profile/${username}`);
        if(!(user.data)){
          navigate(`/profile/${authUser}`)
        }
        else{
          username=user.data.username
          const arr=user.data.followers;
          if(arr.length!==0){
            const newArr=arr.filter((userId)=>{
                return userId===authUserId;
              })
              if(newArr.length==1){
                setIsFollowed(true);
              }
          }
          setProfilePic(user.data.profilePic)
        }
      } catch (error) {
        dispatch(updateUser(null))
      }
    }
    fetchData();
    const getPosts=async()=>{
      try {
        const p=await axiosInstance.get(`/post/find/${username}`);
        setPosts(p.data)
      } catch (error) {
        console.log(error)
      }
    };
    getPosts()
  },[profilePic,username,refresh,isFollowed]);
  return (
    <div className="head">
      <div className="profiles">
      <Leftbar />
      <div className="profile">
        <div className="image">
          <img src={profilePic !== null ? `data:image/png;base64,${profilePic}` : "data:image/png;base64,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"}/>
        </div>
        <form style={{display:`${authUser===username ? '' : 'none'}`}} encType="multipart/form-data">
            <input type="file" required onChange={handleFileChange} name="pic" />
            <button onClick={handleSubmit}>Change Pic</button>
            { err ? err : '' }
        </form>
        <button className="follow" onClick={handleFollow} style={{display:`${authUser===username ? 'none' : ''}`}}>{`${isFollowed ? 'Unfollow' : 'Follow'}`}</button>
        <div className="posts">
          {
            posts.map((post,i)=>(
              <Post key={i} data={post} handleDelete={()=>handleDelete(post._id)}/>
            ))
          }
        </div>
      </div>
      <Rightbar />
      </div>
    </div>
  );
};

export default Profile;
