import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Owner } from 'src/types'
import { GithubService } from 'src/services/github'
import { MongoRepository } from 'src/repository/MongoRepository'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'
import { Link } from 'src/components/elements/Link'

interface Props {
  owner: Owner
}

interface Params extends ParsedUrlQuery {
  owner: string
  backlog: string
}

export default function OwnerPage(data: Props) {
  const owner = data.owner

  return (
    <div id="owner">
      <h2>{owner.name}</h2>
      <Link to={owner.url}>View on Github</Link>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repository = new MongoRepository()
  const service = new GithubService(repository)
  const owners = await service.GetBacklogs()

  const paths = owners.map((backlog) => ({
    params: { owner: backlog.ownerName },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const repository = new MongoRepository()
  const service = new GithubService(repository)
  const owner = await service.GetOwner(context.params.owner)

  if (!owner) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      owner: owner,
    },
    revalidate: DEFAULT_CACHE_REVALIDATE,
  }
}
