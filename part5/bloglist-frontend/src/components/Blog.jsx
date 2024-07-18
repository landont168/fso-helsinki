import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  // toggle visibility upon button click
  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleUpdateBlog = () => {
    console.log('updating blog...')
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDeleteBlog = () => {
    console.log('deleting blog...')
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <span>
          {blog.title} - {blog.author}
        </span>
        <button onClick={toggleVisibility}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>

      {detailsVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button className='like-button' onClick={handleUpdateBlog}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.name === blog.user.name && (
            <button className='delete-button' onClick={handleDeleteBlog}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
