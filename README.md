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

## Part 5 - Testing React apps

- `props.children` - used to pass components as children to a component (ex. to create togglable component)
- `useRef` - creates mutable object that persists across re-renders, commonly used to access or stores references to component instances
- `useImperativeHandle` - customizes the instance value that is exposed when using `ref` in parent components, often used with `forwardRef` to make functions available outside of component
- `Vitest` - used for quick and isolated unit tests (ex. testing React components, mocking API calls to test isolated components)
- `Cypress` - used for E2E tests within a real browser
- `Integration tests` - test backend API functionality (ex. making POST request and verifying response and database changes)
- `Unit tests` - test frontend components in isolation to ensure they render as expected (ex. testing React component to verify it displays correct content when given specific props)
- `E2E tests` - test entire application flow to ensure frontend and backend work as expected (ex. simulating user logging in, creating post, verifying post appears on interface)

## Part 6 - Advanced state management

- `Redux` - state management library that uses a central `store` to manage application's state; allows for predictable state changes through `actions` and `reducers`; actions are dispatched to modify the state
- `useDispatch` - provides React components access to the dispatch function of Redux store; used to send actions to update store
- `useSelector` - allows React components to fetch data from Redux store
- `Redux Toolkit` - library that simplifies working with Redux (ex. create stores with less boilerplate code, write reducers and action creators using simpler syntax, handle asynchronous actions with thunk)
- `configureStore` - simplifies setup of Redux store and reducers
- `createSlice` - combines reducers and action creators into a single API, returning both action creators and the reducer
- `action creators` - Set up the action and dispatch to reducer
- `reducers` - functions that processes actions and updates the state
- `redux-thunk` - middleware that allows action creators to return functions instead of action objects; functions can handle asychronous operations (ex. fetch data from server) and dispatch action (ex. saving data to store); abstracts server communication away from components
- `react-query` - used to store and manage data retrieved from server
- `useReducer` - React hook that manages complex state logic by using a reducer functionto handle state updates in response to dispatched actions
- `createContext` - used to create a context that components can provide or read
- `useContext` - used to read and subscribe to context from your component
- `context` - mechanism for sharing state between components without "prop drilling"

## Part 7 - React router, custom hooks, styling app with CSS and webpack

- `react-router` - library for managing navigation in a React app
- `useParams` - access URL parameter (ex. to fetch specific resource)
- `useNavigate` - change browser's URL (ex. to render page after login)
- `useMatch` - access paramaterizied part of path if URL matches (ex. extract ID of resource to fetch actual resource)
- `custom hooks` - refactor component logic into reusable functions (ex. form field)

## Part 9 - TypeScript
- `TypeScript` - typed superset of JavaScript, eventually compiled to plain JavaScript code
  - Type annotations - record contract for function/variable (provides type checking + code-level documentation)
  - Type erasure - removes all type system constructs during compilation (no type information remains at runtime)
  - Smarter IntelliSense - provides IDEs the type of data you are working with
