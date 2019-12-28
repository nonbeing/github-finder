import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Spinner from './components/layout/Spinner'
import axios from 'axios'

import './App.css'

class App extends Component {
  GitHubUserURL = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

  state = {
    users: [],
    loading: false
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

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          {this.state.loading ? (
            <Spinner />
          ) : (
            <Users loading={this.state.loading} users={this.state.users} />
          )}
        </div>
      </div>
    )
  }
}

export default App
