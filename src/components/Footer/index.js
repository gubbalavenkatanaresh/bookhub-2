import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons">
      <FaGoogle className="icon" />
      <FaTwitter className="icon" />
      <FaInstagram className="icon" />
      <FaYoutube className="icon" />
    </div>
    <p className="end">Contact us</p>
  </div>
)

export default Footer
