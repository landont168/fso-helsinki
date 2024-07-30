import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

// redux store
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
})

// provide store to app globally
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
