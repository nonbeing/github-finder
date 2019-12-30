import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Spinner from './components/layout/Spinner'
import Alert from './components/layout/Alert'
import axios from 'axios'

import './App.css'

class App extends Component {
  GitHubUserURL = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

  state = {
    users: [],
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

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  render() {
    const { loading, users } = this.state
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          {loading ? <Spinner /> : <Users loading={loading} users={users} />}
        </div>
      </div>
    )
  }
}

export default App
