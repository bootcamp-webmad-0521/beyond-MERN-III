import { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Routes from './routes'
import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'
import AuthService from '../services/auth.service'
import Alert from './shared/Alert/Alert'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined,
      alert: { show: false, text: '' }
    }
    this.authService = new AuthService()
  }

  storeUser = loggedUser => this.setState({ loggedUser })
  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(theLoggedUser => this.storeUser(theLoggedUser.data))
      .catch(() => this.storeUser(undefined))
  }
  showMessage = text => this.setState({ alert: { show: true, text } })

  componentDidMount = () => this.fetchUser()

  render() {

    return (
      <>
        <Navigation storeUser={this.storeUser} loggedUser={this.state.loggedUser} showMessage={this.showMessage} />

        <Routes storeUser={this.storeUser} loggedUser={this.state.loggedUser} />

        <Footer />

        <Alert show={this.state.alert.show} text={this.state.alert.text} closeAlert={() => this.setState({ alert: { ...this.state.alert, show: false } })} />
      </>
    )
  }
}

export default App;
