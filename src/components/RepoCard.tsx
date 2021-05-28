import React from 'react'
import { Link } from './elements/Link'
import { RepoIcon } from '@primer/styled-octicons'
import { BorderBox } from '@primer/components'

interface Props {
  title: string
  url: string
  description: string
  className?: string
}

export function RepoCard(props: Props) {
  let className = 'p-3 card'
  if (props.className) className += ` ${props.className}`

  return (
    <Link to={props.url}>
      <BorderBox className={className} width={300} height={100}>
        <div className="mb-2 truncate">
          <RepoIcon aria-label="GitHub Repository" color="#2f363d" />{' '}
          <span className="color-text-link">{props.title}</span>
        </div>
        <p className="truncate-multi">{props.description}</p>
      </BorderBox>
    </Link>
  )
}
