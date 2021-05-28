import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Backlog } from 'src/types'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'
import { GithubService } from 'src/services/github/service'
import { TokenlogService } from 'src/services/tokenlog'
import { Create } from 'src/repository/factory'
import { BacklogLayout } from 'src/components/layouts/Backlog'

interface Props {
  backlog: Backlog
}

interface Params extends ParsedUrlQuery {
  owner: string
  repo: string
}

export default function BacklogPage(data: Props) {
  return <BacklogLayout backlog={data.backlog} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repository = Create()
  const service = new TokenlogService(repository)
  const ids = await service.GetBacklogs()

  const paths = ids
    .map((backlog: Backlog) => {
      if (backlog.type === 'github') {
        const owner = backlog.id.replace('github:', '').split('/')[0]
        const repo = backlog.id.replace('github:', '').split('/')[1]

        return {
          params: { owner: owner, repo: repo },
        }
      }
    })
    .filter((i) => !!i)

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const repository = Create()
  const service = new GithubService(repository)
  const backlog = await service.GetBacklog(
    `github:${context.params.owner}/${context.params.repo}`
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
