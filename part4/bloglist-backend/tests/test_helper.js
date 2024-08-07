const Blog = require("../models/blog")
const User = require("../models/user")

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

// retrives blogs in JSON from db
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
