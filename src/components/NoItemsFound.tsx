import React from 'react'
import { SearchIcon } from '@primer/styled-octicons'
import { PRIMARY_COLOR } from 'src/utils/constants'

interface Props {
  criteria: string
}

export function NoItemsFound(props: Props) {
  return (
    <div className="blankslate">
      <SearchIcon
        className="mb-3"
        size="large"
        aria-label="No items found"
        color={PRIMARY_COLOR}
      />
      <h3 className="mb-1">No items found.</h3>
      <p>No items match your search criteria. Try a different search term.</p>
      <p>
        <pre>{props.criteria}</pre>
      </p>
    </div>
  )
}
