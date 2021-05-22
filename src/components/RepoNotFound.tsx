import React from 'react'
import { Link } from './elements/Link'
import { RepoIcon } from '@primer/styled-octicons'
import { PRIMARY_COLOR } from 'src/utils/constants'

export function RepoNotFound() {
  return (
    <div className="blankslate">
        <RepoIcon className='mb-3' size="large" aria-label="GitHub Repository icon" color={PRIMARY_COLOR} />
        <h3 className="mb-1">Repository not configured.</h3>
        <p>This repository isn't configured to use Tokenlog yet. Check out the documentation to get started.</p>
        <Link  className="btn btn-primary my-3" to='https://github.com/wslyvh/tokenlog#readme'>Learn more</Link>
    </div>
  )
}
