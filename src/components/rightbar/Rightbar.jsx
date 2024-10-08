import { Link } from 'react-router-dom'
import './rightbar.scss'

const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className="createPost">
        <Link className="link" to={'/post'}>Create New Post</Link>
      </div>
    </div>
  )
}

export default Rightbar