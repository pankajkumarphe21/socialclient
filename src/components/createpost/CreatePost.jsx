import { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import './createpost.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreatePost = () => {
    const [desc,setDesc]=useState('');
    const [file, setFile] = useState(null);
    const [data,setData]=useState(null);
    const [err,setErr]=useState(null);
    const [filePreview,setFilePreview]=useState(null);
    const username=useSelector(state=>state.user.currentUser.username);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const formData=new FormData();
      formData.append('image',file);
      formData.append('desc',desc);
      const navigate=useNavigate();
      const handlePreview=()=>{
        setErr(null)
        if(file===null || file===undefined){
          setFilePreview(null);
          setErr('upload image file')
          return;
        }
        if(file.type.startsWith('image/')){
          const objectUrl=URL.createObjectURL(file);
          setFilePreview(objectUrl)
          setData(null)
        }
        else{
          setData('preview for this file type is not available')
          setFilePreview(null)
        }
      }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(file==undefined){
          return;
        }
        try {
            await axiosInstance.post('/post/create',formData);
            navigate(`/profile/${username}`)
        } catch (error) {
          setErr(error.response.data);
        }
    };
  return (
    <div className='createPost'>
        <form encType="multipart/form-data">
            <input type="text" required onChange={(e) => setDesc(e.target.value)} name='desc' placeholder='Enter desc' id='desc'/>
            <input type="file" required onChange={handleFileChange} name="image" id="file" />
            <div onClick={handlePreview}>Get preview of the image</div>
            <button onClick={handleSubmit}>Create Post</button>
            {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            style={{ maxWidth: '300px', maxHeight: '300px',marginTop:'10px',marginBottom:'30px' }}
          />
        )}
            <p>{data}</p>
            {err && err}
        </form>
    </div>
  )
}

export default CreatePost