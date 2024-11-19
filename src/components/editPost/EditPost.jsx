import { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import './editpost.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditPost = () => {
    const [desc,setDesc]=useState('');
    const [file, setFile] = useState(null);
    const postId=useParams();
    const username=useSelector(state=>state.user.currentUser.username);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const formData=new FormData();
      formData.append('image',file)
      formData.append('desc',desc)
      const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(file==undefined){
          return;
        }
        try {
            await axiosInstance.post(`/post/edit/:${postId}`,formData);
            navigate(`/profile/${username}`)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(()=>{
        
    })
  return (
    <div className='editPost'>
        <form encType="multipart/form-data">
            <input type="text" required onChange={(e) => setDesc(e.target.value)} name='desc' placeholder='Enter desc' id='desc'/>
            <input type="file" required onChange={handleFileChange} name="image" id="file" />
            <button onClick={handleSubmit}>Edit Post</button>
        </form>
        {/* <img src={} alt="" /> */}
    </div>
  )
}

export default EditPost