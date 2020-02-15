import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import GitHubContext from '../../context/github/GitHubContext'

const Search = ({ showClear, clearUsers, setAlert }) => {
  const gitHubContext = useContext(GitHubContext)

  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      setAlert('Enter some text to search', 'light')
    } else {
      gitHubContext.searchUsers(text)
      setText('')
    }
  }

  const onChange = e => setText(e.target.value)

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        ></input>
        <input type='submit' value='Search' className='btn btn-dark btn-block'></input>
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  )
}

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
}

export default Search
