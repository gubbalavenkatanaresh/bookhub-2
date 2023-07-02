import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687764046/Group_7484_izz1ib.png"
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button testid="go back button" type="button" className="back-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
