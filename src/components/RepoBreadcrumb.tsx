import React from 'react'
import { Breadcrumb } from '@primer/components'
import { RepoIcon } from '@primer/styled-octicons'
import { SECONDARY_COLOR } from 'src/utils/constants'

interface Props {
  paths: Array<string>
}

export function RepoBreadcrumb(props: Props) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <RepoIcon aria-label="GitHub Repository" color={SECONDARY_COLOR} />
        </Breadcrumb.Item>
        {props.paths.map((i, index) => {
          return (
            <Breadcrumb.Item
              key={i}
              href={'/' + props.paths.slice(0, index + 1).join('/')}
              className={index + 1 === props.paths.length ? 'h3' : 'f3'}
            >
              {i}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </div>
  )
}
