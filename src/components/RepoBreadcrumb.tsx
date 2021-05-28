import React from 'react'
import { Breadcrumb } from '@primer/components'
import { RepoIcon } from '@primer/styled-octicons'

interface Props {
  paths: Array<string>
}

export function RepoBreadcrumb(props: Props) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <RepoIcon aria-label="GitHub Repository" color="#2f363d" />
      </Breadcrumb.Item>
      {props.paths.map((i, index) => {
        return (
          <Breadcrumb.Item
            key={i}
            href={'/' + props.paths.slice(0, index + 1).join('/')}
          >
            {i}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
