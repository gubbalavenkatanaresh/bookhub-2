import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const {active} = props
  const homeClassName = active === 'Home' ? 'active' : 'inactive'
  const shelfClassName = active === 'Shelf' ? 'active' : 'inactive'
  return (
    <>
      <nav className="nav-lg">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687498487/Group_7732_1_jbneod.png"
            alt="website logo"
            className="lg-logo"
          />
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/" className={homeClassName}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/shelf" className={shelfClassName}>
              Bookshelves
            </Link>
          </li>

          <li>
            <button
              type="button"
              onClick={onClickLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <nav className="nav-sm">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687498487/Group_7732_1_jbneod.png"
            alt="website logo"
            className="sm-logo"
          />
        </Link>
        <GiHamburgerMenu />
      </nav>
    </>
  )
}

export default withRouter(Header)
