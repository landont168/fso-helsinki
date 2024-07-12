const Blogs = ({ blogs, name }) => (
  <div>
    <h2>blogs</h2>
    <div>{name} logged in</div>
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
