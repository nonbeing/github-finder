import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

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
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      hireable,
      public_repos,
      public_gists
    } = this.props.user

    const { loading } = this.props

    if (loading) return <Spinner />

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fas fa-check-circle text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              alt='avatar'
              className='round-img'
              style={{ width: '150px' }}
              src={avatar_url}
            ></img>
            <h1>{name}</h1>
            {login && (
              <Fragment>
                <p>
                  <strong>Username:</strong> {login}
                </p>
              </Fragment>
            )}
            <p>
              <strong>Location:</strong> {location}
            </p>
            <a href={html_url} className='btn btn-dark my-1'>
              Visit GitHub Profile
            </a>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}

            <ul>
              <p>
                <br />
              </p>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website:</strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='text-center card'>
          <div className='badge badge-success'>Followers: {followers}</div>
          <div className='badge badge-primary'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
      </Fragment>
    )
  }
}

export default User
