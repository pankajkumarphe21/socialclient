import React from 'react'
import Leftbar from '../../components/leftbar/Leftbar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './home.scss'

const Home = () => {
  return (
    <div className='home'>
      <Leftbar/>
      <Feed/>
      <Rightbar/>
    </div>
  )
}

export default Home