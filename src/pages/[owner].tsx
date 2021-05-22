import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Owner } from 'src/types'
import { GithubService } from 'src/services/github'
import { MongoRepository } from 'src/repository/MongoRepository'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'
import { Link } from 'src/components/elements/Link'
import { RepoBreadcrumb } from 'src/components/RepoBreadcrumb'
import { RepoNotFound } from 'src/components/RepoNotFound'
import { Pagehead } from '@primer/components'

interface Props {
  owner: Owner
}

interface Params extends ParsedUrlQuery {
  owner: string
  backlog: string
}

export default function OwnerPage(data: Props) {
  const owner = data.owner

  if (!owner) {
    return null
  }
  
  // if (owner.backlogs.length <= 0) {
  //   return <RepoNotFound />
  // }

  return (
    <div id="owner">
      <RepoBreadcrumb />
      
      <Pagehead>{owner.name}</Pagehead>
      
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
