import React from 'react'
import Leftbar from '../../components/leftbar/Leftbar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './home.scss'
import Friends from '../../components/friends/Friends'

const Home = () => {
  return (
    <div className='home'>
      <Friends/>
      <div className="feed">
        <Leftbar/>
        <Feed/>
        <Rightbar/>
      </div>
    </div>
  )
}

export default Home