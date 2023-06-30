import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const responseConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Bookshelves extends Component {
  state = {
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    searchText: '',
    activeLabel: bookshelvesList[0].label,
    apiStatus: responseConstants.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: responseConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {bookshelfName, searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: responseConstants.success,
      })
    } else {
      this.setState({apiStatus: responseConstants.failure})
    }
  }

  changeBookShelf = value => {
    this.setState({bookshelfName: value}, this.getData)
  }

  changeLabel = label => {
    this.setState({activeLabel: label})
  }

  changeSearchInput = event => {
    this.setState({
      searchText: event.target.value,
    })
  }

  clickEnter = event => {
    if (event.key === 'Enter') {
      this.getData()
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687764174/Group_7522_c2oelq.png"
        alt="failure-img"
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
    return booksList.length === 0 ? (
      <div>
        <img
          src="https://res.cloudinary.com/dhhsqixfi/image/upload/v1687764036/Asset_1_1_ynfvbi.png"
          alt="no-matches"
        />
        <p>Your search for dsadsdsad did not find any matches.</p>
      </div>
    ) : (
      <div className="footer-books">
        <ul className="books-list">
          {booksList.map(eachBook => (
            <li key={eachBook.id} className="book-details">
              <Link to={`/books/${eachBook.id}`}>
                <img
                  src={eachBook.coverPic}
                  alt="cover-pic"
                  className="book-image"
                />
              </Link>
              <div className="details-container">
                <h1 className="title">{eachBook.title}</h1>
                <p className="details">{eachBook.authorName}</p>
                <p className="details">
                  Avg Rating
                  <BsFillStarFill className="star-icon" />
                  {eachBook.rating}
                </p>
                <p className="details">
                  Status: <span className="span">{eachBook.readStatus}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
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
    const {bookshelfName, searchText, activeLabel} = this.state
    return (
      <>
        <Header active="Shelf" />
        <div className="bookshelves-container">
          <div className="side-bar">
            <h1 className="sidebar-heading">Bookshelves</h1>
            <ul className="book-shelves-list">
              {bookshelvesList.map(eachButton => {
                const {id, value, label} = eachButton
                const activeClassName =
                  bookshelfName === value ? 'active-button' : 'normal-button'
                const clickButton = () => {
                  this.changeBookShelf(value)
                  this.changeLabel(label)
                }
                return (
                  <li
                    key={id}
                    onClick={clickButton}
                    className={activeClassName}
                  >
                    {label}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="main-bar">
            <div>
              <div className="search-head">
                <p>{activeLabel} Books</p>
                <div className="search-container">
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    value={searchText}
                    onKeyDown={this.clickEnter}
                    onChange={this.changeSearchInput}
                  />
                  <div className="search-icon">
                    <BsSearch onClick={this.getData} />
                  </div>
                </div>
              </div>
              {this.renderView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
