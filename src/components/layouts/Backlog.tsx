import { Flex, Truncate, UnderlineNav } from '@primer/components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Link } from '../elements/Link'
import { RepoBreadcrumb } from '../RepoBreadcrumb'
import {
  GearIcon,
  GraphIcon,
  IssueOpenedIcon,
  MarkGithubIcon,
  VerifiedIcon,
} from '@primer/styled-octicons'
import { useBacklog } from 'src/hooks/useBacklog'
import { useVote } from 'src/hooks/useVote'
import { ItemsView } from '../ItemsView'
import { NoSettingsFound } from '../NoSettingsFound'
import { useWeb3 } from 'src/hooks/useWeb3'
import { GetUsedVotingPower, GetUserVotes } from 'src/utils/voting'

export function BacklogLayout() {
  const router = useRouter()
  const backlog = useBacklog()
  const web3Context = useWeb3()
  const voteContext = useVote()
  const [tab, setTab] = useState('items')

  const userVotes = GetUserVotes(voteContext.backlogVotes, web3Context.address)
  const usedVotingPower = GetUsedVotingPower(
    voteContext.backlogVotes,
    web3Context.address
  )

  useEffect(() => {
    if (router.asPath.includes('#')) {
      setTab(router.asPath.split('#').pop())
    }
  }, [router.asPath])

  if (!backlog) {
    return <></>
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

      {!backlog.settings && (
        <div className="Box mt-4">
          <NoSettingsFound />
        </div>
      )}

      {backlog.settings && !backlog.settings.strategy && (
        <div className="Box mt-4">
          <NoSettingsFound noStrategyFound />
        </div>
      )}

      {backlog.settings?.strategy && (
        <>
          <div className="mt-1">
            <UnderlineNav aria-label="Main">
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
                <VerifiedIcon className="mr-2" /> My votes
              </UnderlineNav.Link>
            </UnderlineNav>
          </div>

          <div className="my-4">
            {tab === 'items' && <ItemsView />}

            {tab === 'insights' && (
              <>
                <div>
                  <p>{voteContext.backlogVotes.length} total votes.</p>
                  <pre>{JSON.stringify(voteContext.backlogVotes, null, 2)}</pre>
                </div>
              </>
            )}

            {tab === 'settings' && (
              <div>
                <pre>{JSON.stringify(backlog.settings, null, 2)}</pre>
              </div>
            )}

            {tab === 'votes' && web3Context.address && (
              <>
                <div>Total voting power: {voteContext.votingPower}</div>
                <div>Used voting power: {usedVotingPower} on {userVotes.length} votes.</div>
                <div>
                  <pre>{JSON.stringify(userVotes, null, 2)}</pre>
                </div>
              </>
            )}
            {tab === 'votes' && !web3Context.address && (
              <>
                <p>Connect your account first.</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
