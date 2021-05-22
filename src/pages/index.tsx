import { GetStaticProps } from 'next'
import React from 'react'
import { Link } from 'src/components/elements/Link'
import { MongoRepository } from 'src/repository/MongoRepository'
import { GithubService } from 'src/services/github'
import { Backlog } from 'src/types'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'

interface Props {
  backlogs: Array<Backlog>
}

export default function Index(data: Props) {
  const backlogs = data.backlogs

  return (
    <div>
      <p>
        Democratize your open-source software project. A better way for projects
        to collaborate with their biggest supporters.
      </p>

      <ul>
      {backlogs.map((i: Backlog) => {
        return <li><Link to={`/${i.ownerName}/${i.id}`} className='btn-link'>{i.ownerName} / {i.id}</Link></li>
      })}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const repository = new MongoRepository()
  const service = new GithubService(repository)
  const backlogs = await service.GetBacklogs()
  
  return {
    props: {
      backlogs: backlogs,
    },
    revalidate: DEFAULT_CACHE_REVALIDATE,
  }
}
