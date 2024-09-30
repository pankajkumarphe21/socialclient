import { useState } from 'react'
import axiosInstance from '../../axios'
import './createpost.scss'

const CreatePost = () => {
    const [desc,setDesc]=useState('');
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const formData=new FormData();
      formData.append('image',file)
      formData.append('desc',desc)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axiosInstance.post('/post/create',formData);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <form encType="multipart/form-data">
            <input type="text" required onChange={(e) => setDesc(e.target.value)} name='desc' placeholder='Enter desc'/>
            <input type="file" required onChange={handleFileChange} name="image" id="file" />
            <button onClick={handleSubmit}>Create Post</button>
        </form>
    </div>
  )
}

export default CreatePost