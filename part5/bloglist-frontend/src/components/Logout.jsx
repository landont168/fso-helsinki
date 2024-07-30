const Logout = ({ name, logoutUser }) => (
  <span>
    {name} logged in{' '}
    <button id='logout-button' onClick={logoutUser}>
      logout
    </button>
  </span>
)

export default Logout
