const Logout = ({ name, handleLogout }) => (
  <div>
    {name} logged in <button onClick={handleLogout}>logout</button>
  </div>
)

export default Logout
