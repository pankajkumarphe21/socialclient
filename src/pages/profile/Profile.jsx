import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import './profile.scss'
import axiosInstance from '../../axios'
import { useDispatch, useSelector } from "react-redux";
import Friends from "../../components/friends/Friends";
import Post from "../../components/post/Post";
import { updateUser } from "../../features/current/currentUserSlice";

const Profile = () => {
  let {username} = useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const authUser=useSelector(state=>state.user.currentUser.username);
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const user=await axiosInstance.get(`/auth/profile/${username}`);
        if(!(user.data)){
          navigate(`/profile/${authUser}`)
        }
        else{
          username=user.data._doc.username
        }
      } catch (error) {
        dispatch(updateUser(null))
      }
    }
    fetchData();
    const getPosts=async()=>{
      try {
        const p=await axiosInstance.get('/post/find');
        setPosts(p.data)
      } catch (error) {
        console.log(error)
      }
    };
    getPosts();
  },[]);
  return (
    <div className="head">
      <Friends/>
      <div className="profiles">
      <Leftbar />
      <div className="profile">
        {username}
      </div>
      <div className="createPost">
        <Link className="link" to={'/post'}>New Post</Link>
      </div>
      <div className="posts">
        {
          posts.map((post)=>(
            <Post key={post._id} data={post}/>
          ))
        }
      </div>
      <Rightbar />
      </div>
    </div>
  );
};

export default Profile;
