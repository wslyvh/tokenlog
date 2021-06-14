import {
  Box,
  ButtonPrimary,
  Flex,
  TextInput,
  Tooltip,
  Truncate,
} from '@primer/components'
import {
  SearchIcon,
  ChevronUpIcon,
  VerifiedIcon,
} from '@primer/styled-octicons'
import moment from 'moment'
import React, { ChangeEvent, useState } from 'react'
import { useBacklog } from 'src/hooks/useBacklog'
import { BacklogItem } from 'src/types'
import { PRIMARY_COLOR } from 'src/utils/constants'
import { Link } from './elements/Link'
import { ItemVote } from './ItemVote'
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

  function newItemLink() {
    if (backlog.type === 'github') {
      return backlog.url + '/issues/new/choose'
    }

    return backlog.url
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
          <Link to={newItemLink()}>New item</Link>
        </ButtonPrimary>
      </Flex>

      <div className="Box mt-4">
        {backlog.items.length === 0 && <NoOpenItems />}
        {items.length === 0 && <NoItemsFound criteria={searchValue} />}
        {items.map((i: BacklogItem, index: number) => {
          const lastItem = items.length === index + 1
          return (
            <Box key={i.number} className={lastItem ? '' : 'border-bottom'}>
              <Flex alignItems="flex-start" className="m-2">
                <Flex
                  width={80}
                  flexShrink={0}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  className="border"
                >
                  <ChevronUpIcon
                    size={24}
                    aria-label={'Vote on item #' + i.number}
                    color={PRIMARY_COLOR}
                  />
                  <span>{i.voteSummary?.totalAmount ?? 0}</span>
                </Flex>
                <Flex flexGrow={1} className="mx-4" flexDirection="column">
                  <Flex justifyContent="space-between">
                    <Link className="f4 text-bold mr-2" to={i.url}>
                      <Truncate
                        title={i.title}
                        inline
                        expandable={false}
                        maxWidth="100%"
                      >
                        {i.title}
                      </Truncate>
                    </Link>
                    {i.voteSummary?.voteCount && (
                      <Flex
                        flexShrink={0}
                        flexWrap="nowrap"
                        alignItems="center"
                        className="color-text-secondary"
                      >
                        <Tooltip
                          aria-label={`${i.voteSummary.voteCount} votes cast`}
                        >
                          <VerifiedIcon />
                          <span className="ml-1">
                            {i.voteSummary.voteCount}
                          </span>
                        </Tooltip>
                      </Flex>
                    )}
                  </Flex>
                  <Truncate title={i.description} inline maxWidth="100%">
                    {i.description}
                  </Truncate>
                  <p className="pt-2 mb-0 text-small color-text-tertiary">
                    #{i.number} opened {moment(i.created).fromNow()} by{' '}
                    {i.author}
                    {i.voteSummary?.voteCount || 0} votes
                  </p>
                </Flex>
              </Flex>
            </Box>
          )
        })}
      </div>
    </div>
  )
}
