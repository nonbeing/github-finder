import React, { Component } from 'react'

export class Search extends Component {
  state = {
    text: ''
  }

  onSubmit = e => {
    console.log('out:', this.state.text)
    e.preventDefault()
    console.log('out:', this.state.text)
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <div>
        <form className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          ></input>
          <input type='submit' value='Search' className='btn btn-dark btn-block'></input>
        </form>
      </div>
    )
  }
}

export default Search
