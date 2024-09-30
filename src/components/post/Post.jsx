import './post.scss'

const Post = ({data}) => {
  return (
    <div>
      <img height={'100'} width={'100'} src={`data:image/jpeg;base64,${data.base64Image}`} alt=''></img>
    </div>
  )
}

export default Post