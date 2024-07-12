import { useState, useEffect } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

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
      setUser(user)
    }
  }, [])

  // event handler for login form
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // save user to local storage
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch {
      console.log("wrong credentials")
    }
  }

  // event handler to handle updated username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  // event handler to handle updated password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  // reset user state and local storage when user logs out
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  return (
    <div>
      {user === null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      {user !== null && (
        <Blogs blogs={blogs} name={user.name} handleLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
