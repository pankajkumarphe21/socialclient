import { useDispatch, useSelector } from 'react-redux';
import './friends.scss'
import { Link } from 'react-router-dom';
import { updateFriends } from '../../features/friends/friendsSlice';

const Friends = () => {
  const friends=useSelector(state=>state.friends.friends);
  const dispatch=useDispatch();
  return (
    <div className='friends'>
        {/* {friends.map((username,i)=>(
            <div key={i}>
                <Link onClick={()=>dispatch(updateFriends([]))} className='link' to={`/profile/${username}`}>{username}</Link>
            </div>
        ))} */}
    </div>
  )
}

export default Friends