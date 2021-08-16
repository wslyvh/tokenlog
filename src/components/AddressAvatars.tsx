import { Avatar, Tooltip } from '@primer/components'
import React from 'react'
import makeBlockie from 'ethereum-blockies-base64'
import css from './AddressAvatars.module.scss'

interface Props { 
  addresses: string[]
  totalVoteCount: number
}

export function AddressAvatars(props: Props) {
  return (
    <div className={css.container}>
      {props.addresses.map((i) => { 
        return (
          <Tooltip aria-label={i} className={css.avatar}>
            <Avatar alt={i} src={makeBlockie(i)} size={20}/>
          </Tooltip>
        )
      })}
      <span className="ml-1 text-small color-text-tertiary">
        {props.totalVoteCount} vote(s)
      </span>
    </div>
  )
}
