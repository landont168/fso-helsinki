import { useState, useEffect } from "react"
import "./index.css"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Logout from "./components/Logout"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // login form
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // blog form
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  // notification message
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState("")

  // fetch blogs from server on initial render
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // uses local storage to check if user already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      console.log("user logged in already")
      const user = JSON.parse(loggedUserJSON)
      // restore user and token
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch {
      setNotification("wrong username or password")
      setNotificationType("error")
    }
    setTimeout(() => {
      setNotification(null)
      setNotificationType("")
    }, 5000)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = { title, author, url }
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setNotificationType("success")
    } catch {
      setNotification("error adding blog")
      setNotificationType("error")
    }
    setTimeout(() => {
      setNotification(null)
      setNotificationType("")
    }, 5000)
  }

  // event handlers to update form values
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
    blogService.setToken(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} type={notificationType} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Logout name={user.name} handleLogout={handleLogout} />
      <Notification notification={notification} type={notificationType} />
      <BlogForm
        handleNewBlog={handleNewBlog}
        title={title}
        handleTitleChange={handleTitleChange}
        author={author}
        handleAuthorChange={handleAuthorChange}
        url={url}
        handleUrlChange={handleUrlChange}
      />
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App
