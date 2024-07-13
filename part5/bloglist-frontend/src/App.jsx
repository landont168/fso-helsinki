import { useState, useEffect, useRef } from "react"
import "./index.css"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Logout from "./components/Logout"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState("")

  // fetch initial blogs from server
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // restore user and token from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) 

  // acts as reference to Togglaable component
  const blogFormRef = useRef()

  // create blog with backend service
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setNotificationType("success")
    } catch {
      pass
    }
    setTimeout(() => {
      setNotification(null)
      setNotificationType("")
    }, 5000)
  }

  // login user with backend service
  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch {
      setNotification("wrong username or password")
      setNotificationType("error")
    }
    setTimeout(() => {
      setNotification(null)
      setNotificationType("")
    }, 5000)
  }

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
    blogService.setToken(null)
  }

  // user not logged in
  if (user === null) {
    return (
      <div>
        <Notification notification={notification} type={notificationType} />
        <LoginForm loginUser={loginUser} />
      </div>
    )
  }

  // user logged in
  return (
    <div>
      <h2>blogs</h2>
      <Logout name={user.name} logoutUser={logoutUser} />
      <Notification notification={notification} type={notificationType} />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App
