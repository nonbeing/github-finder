import React, { Component } from 'react'

class UserItem extends Component {
  state = {
    id: 'id',
    login: 'mojombo',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
  }

  render() {
    const { avatar_url, login, html_url } = this.state

    return (
      <div className='card text-center'>
        <img src={avatar_url} alt='' className='round-img' style={{ width: '60px' }}></img>
        <h3>{login}</h3>
        <div>
          <a href={html_url} className='btn btn-dark btn-sm my-1'>
            More
          </a>
        </div>
      </div>
    )
  }
}

export default UserItem
