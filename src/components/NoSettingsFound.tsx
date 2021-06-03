import React from 'react'
import { Link } from './elements/Link'
import { RepoIcon } from '@primer/styled-octicons'
import { PRIMARY_COLOR } from 'src/utils/constants'
import { PromiseProvider } from 'mongoose'

interface Props {
  noStrategyFound?: boolean
}

export function NoSettingsFound(props: Props) {
  return (
    <div className="blankslate">
      <RepoIcon
        className="mb-3"
        size="large"
        aria-label="Backlog not found icon"
        color={PRIMARY_COLOR}
      />
      {props.noStrategyFound && (
        <>
          <h3 className="mb-1">Settings not valid.</h3>
          <p>
            This backlog is using an old configuration file. Check out the
            documentation to continue using Tokenlog.
          </p>
        </>
      )}
      {!props.noStrategyFound && (
        <>
          <h3 className="mb-1">Backlog not configured.</h3>
          <p>
            This repository isn't configured to use Tokenlog. Check out the
            documentation to get started.
          </p>
        </>
      )}

      <Link
        className="btn btn-primary my-3"
        to="https://github.com/wslyvh/tokenlog#readme"
      >
        Learn more
      </Link>
    </div>
  )
}
