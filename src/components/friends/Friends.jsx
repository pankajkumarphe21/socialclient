import { useDispatch, useSelector } from 'react-redux';
import './friends.scss'
import { Link } from 'react-router-dom';
import { updateFriends } from '../../features/friends/friendsSlice';
import Leftbar from '../leftbar/Leftbar';
import Rightbar from '../rightbar/Rightbar';

const Friends = () => {
  const friends=useSelector(state=>state.friends.friends);
  const dispatch=useDispatch();
  return (
    <div className='friendshead'>
      <Leftbar/>
      <div className='friends'>
          {friends.map((friend,i)=>(
              <div key={i}>
                  <Link onClick={()=>dispatch(updateFriends([]))} className='link' to={`/profile/${friend.username}`}>{friend.username}</Link>
              </div>
          ))}
      </div>
      <Rightbar/>
    </div>
  )
}

export default Friends