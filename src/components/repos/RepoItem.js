import React from 'react'
import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {
  return (
    <div className='card grid-2'>
      <div className='all-center'>
        <a href={repo.html_url}>
          <strong>{repo.name}</strong>
        </a>
      </div>
      <div>
        <p>{repo.description && <em style={{ fontSize: '0.9rem' }}>{repo.description}</em>}</p>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
}

export default RepoItem
