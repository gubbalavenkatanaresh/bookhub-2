import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const responseConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {booksList: [], response: responseConstants.initial}

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({response: responseConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState({
        booksList: updatedData,
        response: responseConstants.success,
      })
    } else {
      this.setState({response: responseConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687764174/Group_7522_c2oelq.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" onClick={this.getBooks}>
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
    const {booksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {booksList.map(book => (
            <Link to={`/books/${book.id}`}>
              <li testid="bookItem" key={book.id}>
                <img src={book.coverPic} alt={book.title} />
                <h1>{book.title}</h1>
                <p>{book.authorName}</p>
              </li>
            </Link>
          ))}
        </Slider>
      </ul>
    )
  }

  getResult = () => {
    const {response} = this.state
    switch (response) {
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
        <Header active="Home" />
        <div className="home-container">
          <div>
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p>
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button type="button" className="find-books-btn-sm find-btn">
                Find Books
              </button>
            </Link>
            <div className="slider-container">
              <div className="slider-head">
                <h1 className="slider-heading">Top Rated Books</h1>
                <Link to="/shelf">
                  <button type="button" className="find-books-btn-lg find-btn">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.getResult()}
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
