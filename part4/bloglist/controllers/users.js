const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

// GET USERS
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  })
  response.json(users)
})

// CREATE USER
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  // verify length of password given
  if (!password || password.length < 3) {
    return response
      .status(400)
      .send({ error: "password must be at least 3 characters long" })
  }

  // hash password using bcrypt
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // create new user and save to db
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
