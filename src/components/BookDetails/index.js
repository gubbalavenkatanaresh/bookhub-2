import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const responseConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    resultView: responseConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({resultView: responseConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.book_details.id,
        title: fetchedData.book_details.title,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        readStatus: fetchedData.book_details.read_status,
        rating: fetchedData.book_details.rating,
        aboutAuthor: fetchedData.book_details.about_author,
        aboutBook: fetchedData.book_details.about_book,
      }
      this.setState({
        bookDetails: updatedData,
        resultView: responseConstants.success,
      })
    } else {
      this.setState({resultView: responseConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687764174/Group_7522_c2oelq.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" onClick={this.getBookDetails}>
        Try Again
      </button>
    </div>
  )

  renderInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {bookDetails} = this.state
    const {
      title,
      authorName,
      coverPic,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails
    return (
      <div>
        <div className="book-details">
          <img src={coverPic} alt={title} className="book-image" />
          <div className="details-container">
            <h1 className="title">{title}</h1>
            <p className="details">{authorName}</p>
            <p className="details">
              Avg Rating
              <BsFillStarFill className="star-icon" />
              {rating}
            </p>
            <p className="details">
              Status: <span className="span">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr />
        <h1>About Author</h1>
        <p>{aboutAuthor}</p>
        <h1>About Book</h1>
        <p>{aboutBook}</p>
      </div>
    )
  }

  renderView = () => {
    const {resultView} = this.state
    switch (resultView) {
      case responseConstants.failure:
        return this.renderFailureView()
      case responseConstants.inProgress:
        return this.renderInProgressView()
      case responseConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderView()}
        <Footer />
      </div>
    )
  }
}

export default BookDetails
