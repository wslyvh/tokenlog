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
  return (
    <Link to={props.url}>
      <BorderBox className='p-3'>
          <div className='mb-2'>
            <RepoIcon aria-label="GitHub Repository" color='#2f363d' /> <span className='color-text-link'>{props.title}</span> 
          </div>
          <p>{props.description}</p>
      </BorderBox>      
    </Link>
  )
}
