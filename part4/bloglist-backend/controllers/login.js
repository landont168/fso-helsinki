const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

// LOGIN USER
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  // search for user in db based on username
  const user = await User.findOne({ username })

  // verify password using bcrypt
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  // user does not exist or incorrect password
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }

  // create token for user
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  // return token and user info
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
