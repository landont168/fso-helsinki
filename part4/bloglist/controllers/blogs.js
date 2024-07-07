// set up blog router and model
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

// routes
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

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
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// export router
module.exports = blogsRouter
