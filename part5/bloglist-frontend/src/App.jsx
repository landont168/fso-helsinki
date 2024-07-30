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
  setBlogs,
  addNewBlog,
  updateNewBlog,
  removeBlog,
} from './reducers/blogReducer'

const App = () => {
  // redux hooks
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  // state components
  const [user, setUser] = useState(null)

  // fetch initial blogs from server
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  // restore user and token from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // creates persistent reference to Togglable component
  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      dispatch(addNewBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
    } catch {
      dispatch(setNotification('error creating blog'))
    }
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
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
    setUser(null)
    blogService.setToken(null)
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      dispatch(updateNewBlog(updatedBlog))
    } catch {
      console.log('error updating blog')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteObject(id)
      dispatch(removeBlog(id))
    } catch {
      console.log('error deleting blog')
    }
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
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <Blogs
        blogs={blogs}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={user}
      />
    </div>
  )
}

export default App
