import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Backlog } from 'src/types'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'
import { MongoRepository } from 'src/repository/MongoRepository'
import { GithubService } from 'src/services/github'
import { Link } from 'src/components/elements/Link'

interface Props {
  backlog: Backlog
}

interface Params extends ParsedUrlQuery {
  owner: string
  backlog: string
}

export default function BacklogPage(data: Props) {
  const backlog = data.backlog

  return (
    <div id="backlog">
      <h2>
        {backlog.ownerName} / {backlog.name}
      </h2>
      <Link to={backlog.url}>View on Github</Link>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repository = new MongoRepository()
  const service = new GithubService(repository)
  const owners = await service.GetBacklogs()

  const paths = owners.map((backlog) => ({
    params: { owner: backlog.ownerName, backlog: backlog.name },
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
    context.params.backlog
  )

  return {
    props: {
      backlog: backlog,
    },
    revalidate: DEFAULT_CACHE_REVALIDATE,
  }
}
