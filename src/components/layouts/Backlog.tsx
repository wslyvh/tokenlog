import { Flex, Truncate, UnderlineNav } from '@primer/components'
import React from 'react'
import { Backlog, BacklogItem } from 'src/types'
import { Link } from '../elements/Link'
import { RepoBreadcrumb } from '../RepoBreadcrumb'
import { RepoNotFound } from '../RepoNotFound'
import { SettingsDialog } from '../SettingsDialog'
import { MarkGithubIcon, IssueOpenedIcon, GraphIcon, GearIcon } from '@primer/styled-octicons'

type Props = {
  backlog: Backlog
}

export function BacklogLayout(props: Props) {
  if (!props.backlog) {
    return <></>
  }

  if (!props.backlog.settings) {
    return <RepoNotFound />
  }
  
  return (
    <div>
      <Flex justifyContent="space-between">
        <RepoBreadcrumb paths={[props.backlog.owner, props.backlog.name]} />
        <Flex className='m-1'>
          <Link to={props.backlog.url} className='mr-2'>
            <MarkGithubIcon aria-label="View on Github" />
          </Link>
          <SettingsDialog settings={props.backlog.settings} />
        </Flex>
      </Flex>

      <div className='mt-2'>
        <Truncate title={props.backlog.description} maxWidth={'100%'}>
          {props.backlog.description}
        </Truncate>
      </div>

      <div className='mt-1'>
        <UnderlineNav aria-label="Main">
          <UnderlineNav.Link href="#items" selected>
            <IssueOpenedIcon className='mr-2' /> Items
          </UnderlineNav.Link>
          <UnderlineNav.Link href="#insights">
          <GraphIcon className='mr-2' /> Insights
          </UnderlineNav.Link>
          <UnderlineNav.Link href="#settings">
            <GearIcon className='mr-2' />Settings
          </UnderlineNav.Link>
        </UnderlineNav>
      </div>

      <div className='mt-2'>
        {props.backlog.items.map((i: BacklogItem) => {
          return (
            <div key={i.number}>
              #{i.number} {i.title} ({i.voteSummary?.totalAmount ?? 0} votes)
            </div>
          )
        })}
      </div>
    </div>
  )
}
