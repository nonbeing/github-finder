import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import axios from 'axios'

import './App.css'

class App extends Component {
  GitHubUserURL = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true })

    const res = await axios.get(this.GitHubUserURL)
    console.log('res.data', res.data)
    this.setState({ users: res.data, loading: false })
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
