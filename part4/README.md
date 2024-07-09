# Part 4 - Testing Express servers, user administration

`bloglist`

- 4.1 - set up `npm` project (ex. set up Node/Express app, connect to MongoDB, define routes)
- 4.2 - refactor app into separate modules (ex. `controllers`, `models`, `app.js`, `index.js`)
- 4.3 - set up dummy helper function and unit test
- 4.4 - define `totalLikes` with `reduce` method and unit tests
- 4.5 - define `favoriteBlog` with `reduce` method and unit tests
- 4.6 - define `mostBlogs` with `forEach` and `reduce` methods and unit tests
- 4.7 - define `mostLikes` with `reduce` and `filter` methods and unit tests
- 4.8 - handle and test `GET` requests to /api/blogs URL using `supertest`
- 4.9 - verify naming of `id` property of `Blog` after using `toJSON` method
- 4.10 - handle and test `POST` requests /api/blogs URL
- 4.11 - test that `likes` property defaults to zero if missing from request data
- 4.12 - verify that backends responds with an error if `title` or `url` properties missing from request data
- 4.13 - handle and test `DELETE` requests for a single blog post resource
- 4.14 - handle and test `PUT` requests for a single blog post resource
- 4.15 - create users upon `POST` request (with `bcrypt` to hash passwords) and display users upon `GET` requests to api/users
- 4.16 - add and test username and password restrictions with Mongoose and controller validators
- 4.17 - modify schema of `Blog` to display user information and schema of `User` to display blogs created (using `populate` method)
