const middleware = require("../utils/middleware")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

// GET BLOGS
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

// CREATE A BLOG
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  // return error if title/url missing from request
  if (!body.title || !body.url) {
    return response.status(400).send({ error: "missing title or url" })
  }

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

// GET BLOG BY ID
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// DELETE BLOG
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    // find existing blog based on blog ID
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: "blog not found" })
    }

    // verify user based on token
    if (blog.user.toString() !== user.id) {
      return response.status(401).json({ error: "unauthorized user" })
    }

    // delete blog
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
)

// UPDATE BLOG
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: body.user,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  const updatedBlog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  })

  response.json(updatedBlog)
})

module.exports = blogsRouter
