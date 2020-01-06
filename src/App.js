import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Spinner from './components/layout/Spinner'
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import axios from 'axios'

import './App.css'

class App extends Component {
  GitHubUserURL = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  searchUsers = async queryText => {
    this.setState({ loading: true })
    // const GitHubSearchURL = `https://api.github.com/search/users?q=${queryText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

    const res = await axios.get(
      `https://api.github.com/search/users?q=${queryText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    // console.log('res:', res)
    this.setState({ users: res.data.items, loading: false })
  }

  // get single GitHub user
  getUser = async login => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    // console.log('res:', res)
    this.setState({ user: res.data, loading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  render() {
    const { loading, users, user } = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar title='GitHub Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Users loading={loading} users={users} loading={loading} />
                    )}
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
