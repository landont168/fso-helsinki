const Logout = ({ name, logoutUser }) => (
  <div>
    {name} logged in <button onClick={logoutUser}>logout</button>
  </div>
)

export default Logout
