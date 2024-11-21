import { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import './editpost.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditPost = () => {
    const [desc,setDesc]=useState('');
    const [file, setFile] = useState(null);
    const postId=useParams().postId;
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
        try {
            await axiosInstance.post(`/post/edit/${postId}`,formData);
            navigate(`/profile/${username}`)
        } catch (error) {
            console.log(error)
        }
    };
    const getPostData=async()=>{
      const temp=await axiosInstance.get(`/post/${postId}`);
      const data=temp.data;
      setDesc(data.desc);
    }
    useEffect(()=>{
      getPostData();
    },[])
  return (
    <div className='editPost'>
        <form encType="multipart/form-data">
            <input type="text" required onChange={(e) => setDesc(e.target.value)} name='desc' defaultValue={desc} placeholder='Enter desc' id='desc'/>
            <input type="file" required onChange={handleFileChange} name="image" id="file" />
            <button onClick={handleSubmit}>Edit Post</button>
        </form>
        {/* <img src={} alt="" /> */}
    </div>
  )
}

export default EditPost