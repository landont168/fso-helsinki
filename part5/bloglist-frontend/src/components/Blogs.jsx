import Blog from './Blog.jsx'

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

export default Blogs
