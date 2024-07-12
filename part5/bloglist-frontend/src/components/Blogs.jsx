const Logout = ({ handleLogout }) => (
  <button onClick={handleLogout}>logout</button>
)

const Blogs = ({ blogs, name, handleLogout }) => (
  <div>
    <h2>blogs</h2>
    <div>
      {name} logged in <Logout handleLogout={handleLogout} />
    </div>
    <br />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blogs
