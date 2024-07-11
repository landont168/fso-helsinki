# fso-helsinki

## Part 1 - Introduction to React

- `components` - independent and reusuable building blocks of a web app
- `props` - arguements passed into components
- `useState` - hook that allows you to add a state variable to a component; to manage and store data that changes over time

## Part 2 - Communicating with server

- `useEffect` - hook that allows you to synchronize a component with an external system (ex. fetch data from server); executed after the initial render
- `promise` - object that represents the eventual completion or failure of an asychronous operation (ex. pending, fulfulled, rejected)

## Part 3 - Programming a server with NodeJS and Express

- `NodeJS` - JavaScript runtime based on Google's Chrome V8 JavaScript engine
- `Express` - server-side development library used with Node
- `REST APIs` - allows frontend to interact with backend by sending HTTP requests (ex. `GET`, `POST`, `PUT`, `DELETE`) and receiving HTTP responses (typically in `JSON` format)
- `middleware` - intermediary functions that can process `request` objects before they reach the backend or `response` objects before they reach the client; uses `next()` to pass control to the next route handler/middleware function in the stack (ex. `json-parser` to parse JSON to JS objects, `CORS` to enable cross-origin requests, user authentication, logging requests, error handling)
- `Mongoose` - an ODM for MongoDB that provides a high-level API, allowing interactions with the MongoDB database using JavaScript objects, model application data with schemas, enforce data validation, and simplify database CRUD operations

## Part 4 - Testing Express servers, user administration

- `supertest` - library used for sending HTTP requests to REST API and asserting expected responses
- `async`/`await` - simplifies working with promises in asychronous operations (ex. fetching data); `async` declares function as asychronous, `await` pauses the execution of the function until the promise resolves, making the code look and behave like synchronous code (allows rest of app to run concurrently)
- `bcrypt` - package for hasing passwords to securely store them in a database
- `jsonwebtoken` - library that generates JSON web tokens, enabling token-based authentication (ex. when the user logs in, backend generates a TOKEN that identifies the user)
