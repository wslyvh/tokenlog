import { Flex, Truncate, UnderlineNav } from '@primer/components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BacklogItem } from 'src/types'
import { Link } from '../elements/Link'
import { RepoBreadcrumb } from '../RepoBreadcrumb'
import { RepoNotFound } from '../RepoNotFound'
import {
  CodescanCheckmarkIcon,
  GearIcon,
  GraphIcon,
  IssueOpenedIcon,
  MarkGithubIcon,
} from '@primer/styled-octicons'
import { useBacklog } from 'src/hooks/useBacklog'
import { useVote } from 'src/hooks/useVote'

export function BacklogLayout() {
  const router = useRouter()
  const backlog = useBacklog()
  const voteContext = useVote()
  const [tab, setTab] = useState('items')

  useEffect(() => {
    if (router.asPath.includes('#')) {
      setTab(router.asPath.split('#').pop())
    }
  }, [router.asPath])

  if (!backlog) {
    return <></>
  }

  if (!backlog.settings) {
    return <RepoNotFound />
  }

  if (!backlog.settings.strategy) {
    return (
      <RepoNotFound customText="This repository is using an old configuration file. You need a Snapshot strategy to calculate voting power. Check out the documentation to get started." />
    )
  }

  return (
    <div>
      <Flex justifyContent="space-between">
        <RepoBreadcrumb paths={[backlog.owner, backlog.name]} />
        <Flex className="m-1">
          <Link to={backlog.url} className="mr-2">
            <MarkGithubIcon aria-label="View on Github" />
          </Link>
        </Flex>
      </Flex>

      <div className="mt-2">
        <Truncate title={backlog.description} maxWidth={'100%'}>
          {backlog.description}
        </Truncate>
      </div>

      <div className="mt-1">
        <UnderlineNav aria-label="Main" actions={<p>Ok</p>}>
          <UnderlineNav.Link
            href="#items"
            onClick={() => setTab('items')}
            selected={tab === 'items'}
          >
            <IssueOpenedIcon className="mr-2" /> Items
          </UnderlineNav.Link>
          <UnderlineNav.Link
            href="#insights"
            onClick={() => setTab('insights')}
            selected={tab === 'insights'}
          >
            <GraphIcon className="mr-2" /> Insights
          </UnderlineNav.Link>
          <UnderlineNav.Link
            href="#settings"
            onClick={() => setTab('settings')}
            selected={tab === 'settings'}
          >
            <GearIcon className="mr-2" />
            Settings
          </UnderlineNav.Link>
          <UnderlineNav.Link
            href="#votes"
            onClick={() => setTab('votes')}
            selected={tab === 'votes'}
          >
            <CodescanCheckmarkIcon className="mr-2" /> Voting
          </UnderlineNav.Link>
        </UnderlineNav>
      </div>

      <div className="mt-2">
        {tab === 'items' &&
          backlog.items.map((i: BacklogItem) => {
            return (
              <div key={i.number}>
                #{i.number} {i.title} ({i.voteSummary?.totalAmount ?? 0} votes)
              </div>
            )
          })}

        {tab === 'insights' && <span>Voting insights</span>}

        {tab === 'settings' && (
          <div>
            <pre>{JSON.stringify(backlog.settings, null, 2)}</pre>
          </div>
        )}

        {tab === 'votes' && <div>Voting Power: {voteContext.votingPower}</div>}
      </div>
    </div>
  )
}
