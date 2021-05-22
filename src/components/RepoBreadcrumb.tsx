import React from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb } from '@primer/components'
import { RepoIcon } from '@primer/styled-octicons'

export function RepoBreadcrumb() {
  const router = useRouter()
  const owner = router.query['owner']
  const repo = router.query['repo']

  return (
    <Breadcrumb>
      <Breadcrumb.Item><RepoIcon aria-label="GitHub Repository" color='#2f363d' /></Breadcrumb.Item>
      {owner && <Breadcrumb.Item href={'/' + owner}>{owner}</Breadcrumb.Item>}
      {repo && <Breadcrumb.Item href={'/' + owner + '/' + repo}>{repo}</Breadcrumb.Item>}
    </Breadcrumb>
  )
}

