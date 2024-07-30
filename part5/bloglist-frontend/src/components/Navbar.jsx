import { Link } from 'react-router-dom'
import Logout from './Logout'

const Navbar = ({ user, logoutUser }) => {
  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      <Logout name={user.name} logoutUser={logoutUser} />
    </div>
  )
}

export default Navbar
