import { useEffect, useState } from 'react'
import './feed.scss'
import Post from '../post/Post';
import axiosInstance from '../../axios';

const Feed = () => {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const getPosts=async()=>{
      try {
        const p=await axiosInstance.get('/post/find');
        console.log(p)
        setPosts(p.data)
      } catch (error) {
        console.log(error)
      }
    };
    getPosts();
  },[])
  return (
    <div className='feed'>
      {
          posts.map((post,i)=>(
            <Post key={i} data={post}/>
          ))
        }
    </div>
  )
}

export default Feed