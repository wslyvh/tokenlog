import { Flex } from '@primer/components'
import { GetStaticProps } from 'next'
import React from 'react'
import { RepoCard } from 'src/components/RepoCard'
import { Create } from 'src/repository/factory'
import { TokenlogService } from 'src/services/tokenlog'
import { Backlog } from 'src/types'
import { DEFAULT_CACHE_REVALIDATE } from 'src/utils/constants'

interface Props {
  backlogs: Array<Backlog>
}

export default function Index(data: Props) {
  const backlogs = data.backlogs

  return (
    <div>
      <Flex flexWrap="wrap" justifyContent="space-evenly">
        {backlogs.map((i) => {
          return (
            <RepoCard
              key={i.id}
              className={'m-2 '}
              title={`${i.owner}/${i.name}`}
              url={`/${i.owner}/${i.name}`}
              description={i.description}
            />
          )
        })}
      </Flex>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const repository = Create()
  const service = new TokenlogService(repository)
  const backlogs = await service.GetBacklogs()

  return {
    props: {
      backlogs: backlogs,
    },
    revalidate: DEFAULT_CACHE_REVALIDATE,
  }
}
