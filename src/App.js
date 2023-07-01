import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

import Home from './components/Home'
import Login from './components/Login'
import Bookshelves from './components/Bookshelves'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import BookDetails from './components/BookDetails'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
