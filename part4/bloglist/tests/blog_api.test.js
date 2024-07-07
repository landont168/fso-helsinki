const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const helper = require("./test_helper")

const Blog = require("../models/blog")

// reset database before every test

describe("when there is initially some notes saved", () => {
  // reset db before every test
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe("test HTTP GET requests", () => {
    // returns blogs in JSON format
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })
    // returns the correct amount of blogs
    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs")
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  test("unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs")

    // check all blogs have id property
    response.body.forEach((blog) => {
      assert.ok(blog.id)
      assert.ok(!blog._id)
    })
  })

  describe("test HTTP POST requests", () => {
    // verify total number of blogs and content
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "light path 8",
        author: "killy",
        url: "killy.com",
        likes: 6,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert(titles.includes(newBlog.title))
    })

    test("verifies that likes property defaults to zero if missing in request", async () => {
      const newBlog = {
        title: "heroes and villians",
        author: "metro",
        url: "metro.com",
      }

      const response = await api.post("/api/blogs").send(newBlog).expect(201)
      assert.strictEqual(response.body.likes, 0)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test("responds with status code 400 if title property missing", async () => {
      const newBlog = {
        author: "drake",
        url: "drake.com",
        likes: 21,
      }

      await api.post("/api/blogs").send(newBlog).expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    
    test("responds with status code 400 if url property missing", async () => {
      const newBlog = {
        title: "utopia",
        author: "travis",
        likes: 214,
      }

      await api.post("/api/blogs").send(newBlog).expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
})

// close db connection at the end
after(async () => {
  await mongoose.connection.close()
})
