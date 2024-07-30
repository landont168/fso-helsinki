import { useEffect, useState } from 'react'
import { updateBlog } from '../reducers/blogReducer'
import { setComments, addNewComment } from '../reducers/commentsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { initializeComments, createComment } from '../reducers/commentsReducer'

const BlogDisplay = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  // extract global states from redux store
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)
  const comments = useSelector((state) => state.comments)

  // fetch comments from backend for id
  useEffect(() => {
    dispatch(initializeComments(id))
  }, [dispatch, id])

  if (!blog) {
    return null
  }

  const handleUpdateBlog = () => {
    const blogObject = { ...blog, likes: blog.likes + 1, user: user.id }
    dispatch(updateBlog(blog.id, blogObject))
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(createComment(id, comment))
    setComment('')
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
        <input
          type='text'
          onChange={(event) => setComment(event.target.value)}
        />
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
