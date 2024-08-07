import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'
import { BrowserRouter as Router } from 'react-router-dom'

// redux store
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
})

// provide store to app globally
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
