const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    // misformatted id
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    // not meeting schema (ex. length)
    return response.status(400).json({ error: error.message })
  } else if (
    // ensure uniqueness of username
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" })
  } else if (error.name === "JsonWebTokenError") {
    // missing/invalid token
    return response.status(401).json({ error: "token invalid" })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  // extracts token from auth header
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "")
  }
  next()
}

const userExtractor = async (request, response, next) => {
  // verify and decode token to user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }

  // find user from db based on user ID of token
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
