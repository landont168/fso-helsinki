const Logout = ({ name, logoutUser }) => (
  <div>
    {name} logged in{' '}
    <button id='logout-button' onClick={logoutUser}>
      logout
    </button>
  </div>
)

export default Logout
