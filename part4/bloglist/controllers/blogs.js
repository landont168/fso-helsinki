const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

// isolates token from authorization header
const getTokenFrom = (request) => {
  // retrieve authorization header
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    // return plain token
    return authorization.replace("Bearer ", "")
  }
  return null
}

// routes
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  // verify token and decodes token to object
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }

  // find user based on id
  const user = await User.findById(decodedToken.id)

  // return error if title/url missing from request
  if (!body.title || !body.url) {
    return response.status(400).send({ error: "missing title or url" })
  }

  // defaults likes to 0 if likes missing from request
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  // save blog to db
  const savedBlog = await blog.save()

  // save user with updated blogs array
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

// export router
module.exports = blogsRouter
