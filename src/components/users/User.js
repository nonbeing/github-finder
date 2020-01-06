import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class User extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.login)
  }

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      html_url,
      followers,
      following,
      hireable,
      public_repos,
      public_gists
    } = this.props.user

    const { loading } = this.props

    return <div>{name}</div>
  }
}

export default User
