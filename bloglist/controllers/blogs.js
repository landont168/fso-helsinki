// set up blog router and model
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// routes
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// export router
module.exports = blogsRouter;
