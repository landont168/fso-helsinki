// set up express app
const express = require("express")
const app = express()
require("express-async-errors")

// import modules
const config = require("./utils/config")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

logger.info("connecting to", config.MONGODB_URI)

// connect to db
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

// use middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// mount routers
app.use("/api/login", loginRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

// error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// export app
module.exports = app
