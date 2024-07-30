import { updateBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogDisplay = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)

  if (!blog) {
    return null
  }

  const comments = blog.comments

  const handleUpdateBlog = () => {
    const blogObject = { ...blog, likes: blog.likes + 1, user: user.id }
    dispatch(updateBlog(blog.id, blogObject))
  }

  const handleAddComment = () => {
    // implement comment functionality

  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={handleUpdateBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input type='text' />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDisplay
