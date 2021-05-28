import { Pagehead } from '@primer/components'
import React from 'react'
import { Backlog } from 'src/types'
import { Link } from '../elements/Link'
import { RepoBreadcrumb } from '../RepoBreadcrumb'
import { RepoNotFound } from '../RepoNotFound'
import css from './backlog.module.scss'
import { SettingsDialog } from '../SettingsDialog'

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
    <div className={css['container']}>
      <div className={css['header']}>
        <RepoBreadcrumb paths={[props.backlog.owner, props.backlog.name]} />
        <SettingsDialog settings={props.backlog.settings} />
      </div>

      <Pagehead>{props.backlog.name}</Pagehead>

      <Link to={props.backlog.url}>View on Github</Link>
    </div>
  )
}
