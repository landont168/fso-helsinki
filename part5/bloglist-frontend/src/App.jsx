import './index.css'
import { useState, useEffect, useRef } from 'react'

// react components
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

// backend services
import blogService from './services/blogs'
import loginService from './services/login'

// redux store setup
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { loginAsyncUser, setUser } from './reducers/userReducer'

const App = () => {
  // redux hooks
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  // fetch initial blogs from server
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // restore user and token from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  // creates persistent reference to Togglable component
  const blogFormRef = useRef()

  const hanldeAddBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blogObject))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
    } catch {
      dispatch(setNotification('error creating blog'))
    }
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const handleUpdateBlog = async (id, blogObject) => {
    try {
      dispatch(updateBlog(id, blogObject))
    } catch {
      console.log('error updating blog')
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      dispatch(deleteBlog(id))
    } catch {
      console.log('error deleting blog')
    }
  }

  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(setNotification('successful log in'))
    } catch {
      dispatch(setNotification('wrong username or password'))
    }
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} type={'success'} />
        <LoginForm loginUser={loginUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Logout name={user.name} logoutUser={logoutUser} />
      <Notification notification={notification} type={'success'} />
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlog={hanldeAddBlog} />
      </Togglable>
      <Blogs
        blogs={blogs}
        updateBlog={handleUpdateBlog}
        deleteBlog={handleDeleteBlog}
        user={user}
      />
    </div>
  )
}

export default App
