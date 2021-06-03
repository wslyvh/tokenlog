import { ButtonPrimary, Flex, TextInput } from '@primer/components'
import { SearchIcon } from '@primer/styled-octicons'
import React, { ChangeEvent, useState } from 'react'
import { useBacklog } from 'src/hooks/useBacklog'
import { BacklogItem } from 'src/types'
import { NoItemsFound } from './NoItemsFound'
import { NoOpenItems } from './NoOpenItems'

export function ItemsView() {
  const backlog = useBacklog()
  const [searchValue, setSearchValue] = useState('')
  const [items, setItems] = useState(backlog.items)

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchValue(value)

    if (!value) {
      setItems(backlog.items)
      return
    }

    const filtered = backlog.items.filter((i) =>
      i.title.toLowerCase().includes(value.toLowerCase())
    )
    setItems(filtered)
  }

  return (
    <div>
      <Flex justifyContent="space-between">
        <TextInput
          css=""
          variant="small"
          icon={SearchIcon}
          aria-label="Search items"
          name="search"
          placeholder="Search items.."
          onChange={onSearch}
        />
        <ButtonPrimary css="" variant="small">
          New item
        </ButtonPrimary>
      </Flex>

      <div className="Box mt-4">
        {backlog.items.length === 0 && <NoOpenItems />}
        {items.length === 0 && <NoItemsFound criteria={searchValue} />}
        {items.map((i: BacklogItem) => {
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
