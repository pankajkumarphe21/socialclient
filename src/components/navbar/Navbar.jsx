import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/current/currentUserSlice";
import { updateDarkMode } from "../../features/darkmode/darkmodeSlice";
import axiosInstance from "../../axios";
import { useState } from "react";
import { updateFriends } from "../../features/friends/friendsSlice";

const Navbar = () => {
  const username=useSelector(state=>state.user.currentUser.username);
  const dispatch=useDispatch()
  const darkMode=useSelector(state=>state.darkMode.darkMode);
  const handleLogout=async()=>{
    await axiosInstance.post('/auth/logout');
    dispatch(updateUser(null));
  }
  const handleSearch=async()=>{
    const data=(await axiosInstance.post(`/auth/search/${friend}`)).data;
    dispatch(updateFriends(data))
  }
  const [friend,setFriend]=useState("");
  return (
    <div className="navbar">
      <div className="in">
      <div className="left">
        <div className="icon">
          <div className="lefticon"></div>
          <Link className="link" to={'/'}>Social</Link>
          <div className="righticon"></div>
        </div>
        <div className="darkMode">
          <DarkModeOutlinedIcon onClick={()=>dispatch(updateDarkMode())}/>
        </div>
        <div className="menu">
          <AppsOutlinedIcon/>
        </div>
      </div>
      <div className={`search ${darkMode ? 'dark' : ''}`}>
        <SearchOutlinedIcon className="searchicon" onClick={handleSearch}/>
        <input value={friend} onChange={(e)=>setFriend(e.target.value)} className={`${darkMode ? 'dark' : ''}`} type="text" placeholder="Search friends"/>
      </div>
      <div className="right">
        <div className="icons">
          <MailOutlineOutlinedIcon/>
          <NotificationsOutlinedIcon/>
        </div>
        <div className="user">
          <PersonOutlinedIcon/>
          <Link to={`/profile/${username}`}
          className="link">{username}</Link>
        </div>
        <p onClick={handleLogout}>Logout</p>
      </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
