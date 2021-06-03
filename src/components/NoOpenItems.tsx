import React from 'react'
import { InfoIcon } from '@primer/styled-octicons'
import { PRIMARY_COLOR } from 'src/utils/constants'

export function NoOpenItems() {
  return (
    <div className="blankslate">
      <InfoIcon
        className="mb-3"
        size="large"
        aria-label="No open items icon"
        color={PRIMARY_COLOR}
      />
      <h3 className="mb-1">No open items.</h3>
      <p>This backlog doesn't have any open issues.</p>
    </div>
  )
}
