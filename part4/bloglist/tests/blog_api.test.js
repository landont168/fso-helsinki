const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const helper = require("./test_helper")
const User = require("../models/user")
const Blog = require("../models/blog")

describe("when there is some blogs and a user saved", () => {
  beforeEach(async () => {
    // reset blog db
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    // reset user db
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("minnie123", 10)
    const user = new User({ username: "bob", passwordHash })
    await user.save()
  })

  // GET REQUESTS
  describe("test HTTP GET requests", () => {
    test("blogs are returned as JSON", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })
    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs")
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })
  test("unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs")

    response.body.forEach((blog) => {
      assert.ok(blog.id)
      assert.ok(!blog._id)
    })
  })

  // POST REQUESTS
  describe("test HTTP POST requests to blog", () => {
    test("succeeds with valid data and authorized user", async () => {
      // login to get token
      const user = {
        username: "bob",
        password: "minnie123",
      }
      const authorizedUser = await api.post("/api/login").send(user).expect(200)

      // add new blog with token
      const newBlog = {
        title: "light path 8",
        author: "killy",
        url: "killy.com",
        likes: 6,
      }
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${authorizedUser.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      // verify that blog was added to db
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert(titles.includes(newBlog.title))
    })

    test("verifies that likes property defaults to zero if missing in request", async () => {
      // login to get token
      const user = {
        username: "bob",
        password: "minnie123",
      }
      const authorizedUser = await api.post("/api/login").send(user).expect(200)

      // add new blog with token
      const newBlog = {
        title: "heroes and villians",
        author: "metro",
        url: "metro.com",
      }

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${authorizedUser.body.token}`)
        .send(newBlog)
        .expect(201)

      assert.strictEqual(response.body.likes, 0)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test("responds with status code 400 if title property missing", async () => {
      // login to get token
      const user = {
        username: "bob",
        password: "minnie123",
      }
      const authorizedUser = await api.post("/api/login").send(user).expect(200)

      // try to add new blog
      const newBlog = {
        author: "drake",
        url: "drake.com",
        likes: 21,
      }

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${authorizedUser.body.token}`)
        .send(newBlog)
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test("responds with status code 400 if url property missing", async () => {
      // login to get token
      const user = {
        username: "bob",
        password: "minnie123",
      }
      const authorizedUser = await api.post("/api/login").send(user).expect(200)

      // try to add new blog
      const newBlog = {
        title: "utopia",
        author: "travis",
        likes: 214,
      }

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${authorizedUser.body.token}`)
        .send(newBlog)
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test("adding blog fails if token not provided", async () => {
      // add new blog without token
      const newBlog = {
        title: "light path 8",
        author: "killy",
        url: "killy.com",
        likes: 6,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/)

      // verify that blog was not added to db
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert(!titles.includes(newBlog.title))
    })
  })

  describe("deletion of a blog", () => {
    test("successfully deletes with status code 204 if id and token is valid", async () => {
      // login to get token
      const user = {
        username: "bob",
        password: "minnie123",
      }
      const authorizedUser = await api.post("/api/login").send(user).expect(200)

      // add new blog with token
      const newBlog = {
        title: "utopia",
        author: "travis scott",
        url: "travypatty.com",
        likes: 111,
      }
      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${authorizedUser.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      // verify that blog was added to db
      let blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      // delete blog
      await api
        .delete(`/api/blogs/${response.body.id}`)
        .set("Authorization", `Bearer ${authorizedUser.body.token}`)
        .expect(204)

      // verify that blog was removed from db
      blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert(!titles.includes(response.body.title))
    })
  })

  describe("update a blog", () => {
    test("succeeds with valid data", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      // set up updated blog
      const updatedBlog = {
        ...blogToUpdate,
        likes: 420,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      // verify that blog was updated in db
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const updatedBlogInDb = await api.get(`/api/blogs/${blogToUpdate.id}`)
      assert.strictEqual(updatedBlogInDb.body.likes, 420)
    })
  })

  describe("creating a user", () => {
    // reset user db before each test
    beforeEach(async () => {
      await User.deleteMany({})

      // add bob user to db
      const passwordHash = await bcrypt.hash("sekret", 10)
      const user = new User({ username: "bob", passwordHash })
      await user.save()
    })

    test("succeeds with valid data", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "stormer168",
        name: "landon trinh",
        password: "bob123",
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map((user) => user.username)
      assert(usernames.includes(newUser.username))
    })

    test("missing username and password", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "landon trinh",
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test("test for unique username", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "bob",
        name: "bob the builder",
        password: "bob123",
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes("expected `username` to be unique"))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test("test for short password", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "stormer168",
        name: "landon",
        password: "12",
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(
        result.body.error.includes(
          "password must be at least 3 characters long"
        )
      )
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

// close db connection at the end
after(async () => {
  await mongoose.connection.close()
})
