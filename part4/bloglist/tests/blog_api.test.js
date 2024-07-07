const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

// wrap app with supertest function
const api = supertest(app)

// initial data
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

// reset database before every test
beforeEach(async () => {
  await Blog.deleteMany({})

  // read initial blogs to db
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// tests
test("notes are returned as json", async () => {
  await api
    .get("/api/blogs") // make GET request
    .expect(200) // status code 200
    .expect("Content-Type", /application\/json/) // JSON format
})

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test("the first blog is about mew", async () => {
  const response = await api.get("/api/blogs")
  const titles = response.body.map((e) => e.title)
  assert(titles.includes("pokemon book"))
})

// close db connection at the end
after(async () => {
  await mongoose.connection.close()
})
