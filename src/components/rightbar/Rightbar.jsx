import { Link, useNavigate } from 'react-router-dom'
import './rightbar.scss'

const Rightbar = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/post')
  }
  return (
    <div className='rightbar'>
      <div className="createPost" onClick={handleClick}>
        <Link className="link" to={'/post'}>Create New Post</Link>
      </div>
    </div>
  )
}

export default Rightbar