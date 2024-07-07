const Blog = require("../models/blog")

// initial blogs array
const initialBlogs = [
  {
    title: "pokemon book",
    author: "ash",
    url: "youtube.com",
    likes: 99,
  },
  {
    title: "last to leave lolz",
    author: "mrbeast",
    url: "youtube.com",
    likes: 43,
  },
]

// creates a non-existent id
const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// retrives blogs in JSON from db
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
