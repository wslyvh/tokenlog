import { Box, Button, Flex, Heading, Pagehead, SelectMenu, Text } from "@primer/components"
import { CheckIcon } from "@primer/styled-octicons"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useVote } from "src/hooks/useVote"
import { Vote } from "src/types"
import { InsightTimeline, InsightTimelineItem } from "./InsightTimeline"
import { VotesGraph } from "./VotesGraph"

const DateFilterTypes  = {
    week: "week",
    month: "month",
    everything: "everything"
}

interface data {
    votes: Array<Vote>
    date: Date
    type: string
}

export function InsightView() {
    const vote = useVote()
    const dateFormat = 'MMMM D, YYYY'
    const [data, setData] = useState<data>({
        date: new Date(),
        type: DateFilterTypes.month,
        votes: []
    })
    const [events, setEvents] = useState<Array<InsightTimelineItem>>([])
    const [order, setOrder] = useState<'address' | 'backlogItem'>('address')
    
    useEffect(() => {
        if(!data.votes) {
            onFilter(DateFilterTypes.month)
        }
      }, [vote.backlogVotes])

      useEffect(() => {
        if(data.votes) {
            getEvents()
        }
      }, [data.votes])

    function changeOrder() {
        if(order === 'backlogItem') {
            setOrder('address')
        }
        else {
            setOrder('backlogItem')
        }
        getEvents()
    }

    function getEvents() {
        if(order === 'backlogItem') {
            setEvents(uniqueVoteByAddress(data.votes))
        }
        else {
            setEvents(uniqueVotesByBacklogItem(data.votes))
        }
    }

    function onFilter(type: string) {
        if(!type || type === DateFilterTypes.everything) {
            setData({
                date: new Date(firstVote(vote.backlogVotes).timestamp),
                votes: vote.backlogVotes,
                type: DateFilterTypes.everything
            })
        }
        else {
            const currentDate: Date = new Date()
            if(type === DateFilterTypes.month) {
                currentDate.setMonth(currentDate.getMonth() - 1)
            }
            else {
                currentDate.setDate(currentDate.getDate() - 7)
            }
            
            setData({
                date: currentDate,
                votes: vote.backlogVotes.filter((i) => moment(i.timestamp).isAfter(currentDate)),
                type: type
            })
        }
    }

    function uniqueAddress(votes: Array<Vote>) : Array<string> {
        return [...new Set(votes.map((i) => i.address))]
    }

    function totalVotingPower(votes: Array<Vote>) : number {
        return votes.map((i) => i.amount).reduce((a, b) => a + b, 0)
    }

    function averageVotingPower(votes: Array<Vote>) : number {
        return Math.round(totalVotingPower(votes) / uniqueBacklogItems(votes).length) * 100 / 100
    }

    function uniqueBacklogItems(votes: Array<Vote>) : Array<number> {
        return [...new Set(votes.map((i) => i.number))]
    }

    function firstVote(votes: Array<Vote>) : Vote {
        return votes.sort((a, b) => {
            return a.timestamp - b.timestamp
        })[0]
    }
    
    function uniqueVoteByAddress(votes: Array<Vote>) : Array<InsightTimelineItem> {
        if(!votes)
        return []

        const addresses = uniqueAddress(votes)
        const summary = addresses.map((address) => {
            const addressVotes = getAddressVotes(votes, address)
            return {
                name: address,
                votes: addressVotes,
                votingPower: totalVotingPower(addressVotes),
                amount: uniqueBacklogVotes(addressVotes).length
            } as InsightTimelineItem
        })

        return summary.sort((a, b) => a.amount - b.amount).reverse()
    }

    function uniqueVotesByBacklogItem(votes: Array<Vote>) : Array<InsightTimelineItem> {
        if(!votes)
            return []

        const items = uniqueBacklogItems(votes)
        const summary = items.map((item) => {
            const itemVotes = getBackLogItemVotes(votes, item)
            return {
                name: item.toString(),
                votes: itemVotes,
                votingPower: totalVotingPower(itemVotes),
                amount: uniqueAddressVotes(itemVotes).length
            } as InsightTimelineItem
        })

        return summary.sort((a, b) => a.amount - b.amount).reverse()
    }

    function getAddressVotes(votes : Array<Vote>, address : string) : Array<Vote> {
        return votes.filter(i => i.address === address)
    }

    function getBackLogItemVotes(votes : Array<Vote>, number : number) : Array<Vote> {
        return votes.filter(i => i.number === number)
    }

    function uniqueBacklogVotes(votes: Array<Vote>) {
        return [... new Set(votes.map((vote) => {return vote.number}))];
    }

    function uniqueAddressVotes(votes: Array<Vote>) {
        return [... new Set(votes.map((vote) => {return vote.address}))];
    }
    
    if(vote.backlogVotes.length == 0)
    {
        return(<div>No votes found!</div>)
    }

    return(
        <div>
            <Pagehead>
                <Flex>
                    <Flex flexGrow={1} flexDirection="column">
                        <Heading fontSize={3}>
                            {moment(data.date).format(dateFormat)} - {moment().format(dateFormat)}
                        </Heading>
                    </Flex>
                    <Flex p={1} flexShrink={0} flexDirection="column" justifyContent="center" alignItems="center" >
                        <Button css="" onClick={() => changeOrder()} ><Text color="text.secondary">Sort by : </Text> {order === 'backlogItem' ? 'address' : 'backlogItem'} </Button>
                    </Flex>
                    <Flex p={1} flexShrink={0} flexDirection="column" justifyContent="center" alignItems="center" >
                        <SelectMenu css="">
                            <Button css="" as="summary">
                                 
                                {data.type === DateFilterTypes.everything ?  data.type : '1 ' + data.type}</Button>
                            <SelectMenu.Modal css="" align="right">
                                <SelectMenu.Header css="">Filter activities</SelectMenu.Header>
                                <SelectMenu.List>
                                    {Object.keys(DateFilterTypes).map((dateFilterTypes: string, i: number) => {
                                        const display = dateFilterTypes === DateFilterTypes.everything ? dateFilterTypes : `1 ${dateFilterTypes}`
                                        return(
                                            <SelectMenu.Item key={i} css="" onClick={() => {onFilter(dateFilterTypes)}}> 
                                            {data.type === dateFilterTypes && (<CheckIcon className="mr-2" />)} {display}</SelectMenu.Item>
                                        )
                                    })}
                                </SelectMenu.List>
                            </SelectMenu.Modal>
                        </SelectMenu>
                    </Flex>
                </Flex>
            </Pagehead>
            {data.votes.length === 0 && (<span>There hasn’t been any voting activity in the last {data.type}.</span>)}
            {data.votes.length > 0 && (
                <div>
                    <Flex>
                        <Flex p={3} flexGrow={1} flexDirection="column" width={'50%'}>
                            <InsightTimeline items={events} type={order} />
                        </Flex>
                        <Flex flexShrink={0} flexDirection="column" width={'50%'}>
                            <Box p={3}>
                                <Text fontSize={2} color="text.secondary" textAlign="center">
                                    There has a total of <Text as='span' fontWeight="bold" color="text.primary">{data.votes.length} votes</Text> been 
                                    cast by <Text as='span' fontWeight="bold" color="text.primary">{uniqueAddress(data.votes).length} unique voters</Text>, 
                                    with a total of <Text as='span' fontWeight="bold" color="text.primary">{totalVotingPower(data.votes)} voting power</Text>.
                                    This comes down to a average of <Text as='span' fontWeight="bold" color="text.primary">{averageVotingPower(data.votes)} voting power</Text> for each backlog item that has been voted on.
                                </Text>
                            </Box>
                            <Box>
                                <VotesGraph votes={data.votes} />
                            </Box>
                        </Flex>
                    </Flex>
                    <Box p={3}>
                        
                    </Box>
                    <Box>
                        <Heading fontSize={2}>Give it to me raw.</Heading>
                        <pre>{JSON.stringify(data.votes, null, 2)}</pre>
                    </Box>
                </div>
            )}
        </div>
    )
}
