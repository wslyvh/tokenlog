import { GetStaticProps } from 'next'
import React from 'react'
import { RepoCard } from 'src/components/RepoCard'
import { MongoRepository } from 'src/repository/MongoRepository'
import { GithubService } from 'src/services/github'
import { Backlog } from 'src/types'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'

interface Props {
  backlogs: Array<Backlog>
}

export default function Index(data: Props) {
  // const backlogs = data.backlogs
  const backlogs = [
    {
      id: '1',
      name: 'tokenlog',
      ownerName: 'wslyvh',
      description: 'Democratize your open-source software project.'
    },
    {
      id: '2',
      name: 'coordination',
      ownerName: 'CommonsBuild',
      description: 'The Coordination repo issues serve to coordinate all the work across the Token Engineering Commons (TEC)'
    }
  ]

  return (
    <div>
      <p>
        Democratize your open-source software project. A better way for projects
        to collaborate with their biggest supporters.
      </p>

      <div>
        {backlogs.map((i) => { 
          return <RepoCard key={i.id} 
            title={`${i.ownerName}/${i.name}`} 
            url={`/${i.ownerName}/${i.name}`} 
            description={i.description} />
        })}
      </div>
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
