import { useSelector } from 'react-redux';
import './friends.scss'
import { Link } from 'react-router-dom';

const Friends = () => {
  const friends=useSelector(state=>state.friends.friends);
  return (
    <div className='friends'>
        {friends.map((username,i)=>(
            <div key={i}>
                <Link className='link' to={`/profile/${username}`}>{username}</Link>
            </div>
        ))}
    </div>
  )
}

export default Friends