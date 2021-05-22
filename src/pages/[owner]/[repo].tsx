import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Backlog } from 'src/types'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'
import { MongoRepository } from 'src/repository/MongoRepository'
import { GithubService } from 'src/services/github'
import { Link } from 'src/components/elements/Link'
import { RepoNotFound } from 'src/components/RepoNotFound'
import { RepoBreadcrumb } from 'src/components/RepoBreadcrumb'
import { Pagehead } from '@primer/components'

interface Props {
  backlog: Backlog
}

interface Params extends ParsedUrlQuery {
  owner: string
  repo: string
}

export default function BacklogPage(data: Props) {
  const backlog = data.backlog

  if (!backlog) { 
    return <></>
  }

  if (!backlog.settings) {
    return <RepoNotFound />
  }

  return (
    <div id="backlog">
      <RepoBreadcrumb />
      
      <Pagehead>{backlog.name}</Pagehead>

      <Link to={backlog.url}>View on Github</Link>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repository = new MongoRepository()
  const service = new GithubService(repository)
  const owners = await service.GetBacklogs()

  const paths = owners.map((backlog: Backlog) => ({
    params: { owner: backlog.ownerName, repo: backlog.id },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const repository = new MongoRepository()
  const service = new GithubService(repository)
  const backlog = await service.GetBacklog(
    context.params.owner,
    context.params.repo
  )

  if (!backlog) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      backlog: backlog,
    },
    revalidate: DEFAULT_CACHE_REVALIDATE,
  }
}
