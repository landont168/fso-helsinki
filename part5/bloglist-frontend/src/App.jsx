import { useState, useEffect } from "react"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import Login from "./components/Login"
import Logout from "./components/Logout"
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
      console.log("token added")
    } catch {
      console.log("wrong credentials")
    }
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
    } catch {
      console.log("error adding blog")
    }
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
      <Login
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <Logout handleLogout={handleLogout} />
      </div>
      <br />
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
