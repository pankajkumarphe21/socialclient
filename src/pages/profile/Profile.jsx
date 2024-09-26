import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import './profile.scss'
import axiosInstance from '../../axios'
import { useSelector } from "react-redux";
import Friends from "../../components/friends/Friends";

const Profile = () => {
  let {username} = useParams();
  const navigate=useNavigate();
  const authUser=useSelector(state=>state.user.currentUser.username);
  useEffect(()=>{
    const fetchData=async ()=>{
      const user=await axiosInstance.get(`/auth/profile/${username}`);
      if(!(user.data)){
        navigate(`/profile/${authUser}`)
      }
      else{
        username=user.data._doc.username
      }
    }
    fetchData();
  },[]);
  return (
    <div className="head">
      <Friends/>
      <div className="profiles">
      <Leftbar />
      <div className="profile">
        {username}
      </div>
      <Rightbar />
      </div>
    </div>
  );
};

export default Profile;
