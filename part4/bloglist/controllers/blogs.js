// set up blog router and model
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

// routes
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// export router
module.exports = blogsRouter
