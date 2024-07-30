import './index.css'
import { useEffect, useRef } from 'react'

// react components
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import BlogDisplay from './components/BlogDisplay'
import Navbar from './components/Navbar'

// backend services
import blogService from './services/blogs'
import loginService from './services/login'

// redux store setup
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  initializeBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogReducer'

// react router setup
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'

const App = () => {
  // redux hooks
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  // fetch initial blogs and users from server
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  // creates persistent reference to toggle component
  const blogFormRef = useRef()

  const handleAddBlog = async (blogObject) => {
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

  const Home = () => (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlog={handleAddBlog} />
      </Togglable>
      <Blogs
        blogs={blogs}
        updateBlog={handleUpdateBlog}
        deleteBlog={handleDeleteBlog}
        user={user}
      />
    </div>
  )

  return (
    <div>
      <Navbar user={user} logoutUser={logoutUser} />
      <h2>blogs</h2>
      <Notification notification={notification} type={'success'} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<BlogDisplay />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
