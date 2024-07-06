// set up express app
const express = require("express")
const app = express()

// import modules
const config = require("./utils/config")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const logger = require("./utils/logger")
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

// enable middleware
app.use(cors())
app.use(express.json())

// mount router to blogs route
app.use("/api/blogs", blogsRouter)

// export app
module.exports = app
