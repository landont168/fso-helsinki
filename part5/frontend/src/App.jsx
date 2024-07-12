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

  // fetch blogs from server
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // event handler for login form
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      // successful login
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
    } catch {
      console.log("wrong credentials")
    }
  }

  return (
    <div>
      {user === null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user !== null && <Blogs blogs={blogs} name={user.name} />}
    </div>
  )
}

export default App
