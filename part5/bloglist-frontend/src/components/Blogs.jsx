import { useState } from 'react'

const Blogs = ({ blogs, updateBlog, deleteBlog, user }) => (
  <div>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
  </div>
)

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // toggle visibility upon button click
  const toggleVisibility = () => {
    setVisible(!visible)
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
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleUpdateBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user.name === blog.user.name && (
          <button onClick={handleDeleteBlog}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blogs
