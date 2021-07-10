import { Avatar, Box, Button, Flex, Heading, Pagehead, SelectMenu, Text, Timeline } from "@primer/components"
import { CheckIcon, VerifiedIcon } from "@primer/styled-octicons"
import makeBlockie from "ethereum-blockies-base64"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useVote } from "src/hooks/useVote"
import { Vote } from "src/types"

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

interface addressSummary {
    address: string,
    votes: Array<Vote>,
    amount: number
}

export function InsightView() {
    const vote = useVote()
    const dateFormat = 'MMMM D, YYYY'
    const [data, setData] = useState<data>({
        date: new Date(),
        type: DateFilterTypes.month,
        votes: []
    })
    
    useEffect(() => {
        if(!data.votes) {
            onFilter(DateFilterTypes.month)
        }
      }, [vote.backlogVotes])

    function onFilter(type: string) {
        if(!type || type === DateFilterTypes.everything) {
            setData({
                date: firstVote(vote.backlogVotes).timestamp,
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
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        })[0]
    }
    
    function uniqueVoteByAddress(votes: Array<Vote>) : Array<addressSummary> {
        if(!votes)
            return []

        const addresses = uniqueAddress(votes)
        const summary = addresses.map((address) => {
            const addressVotes = getAddressVotes(votes, address)
            return {
                address: address,
                votes: addressVotes,
                amount: totalVotingPower(addressVotes)
            } as addressSummary
        })

        return summary.sort((a, b) => a.amount - b.amount).reverse()
    }

    function getAddressVotes(votes : Array<Vote>, address : string) : Array<Vote> {
        return votes.filter(i => i.address === address)
    }

    function uniqueBacklogVotes(votes: Array<Vote>) {
        return [... new Set(votes.map((vote) => {return vote.number}))];
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
                    <Flex width={125} flexShrink={0} flexDirection="column" justifyContent="center" alignItems="center" >
                        <SelectMenu css="">
                            <Button css="" as="summary">
                                <Text color="text.secondary">Period: </Text> 
                                {data.type === DateFilterTypes.everything ?  data.type : '1 ' + data.type}</Button>
                            <SelectMenu.Modal css="" align="right">
                                <SelectMenu.Header css="">Filter activity</SelectMenu.Header>
                                <SelectMenu.List>
                                    {Object.keys(DateFilterTypes).map((dateFilterTypes: string) => {
                                        const display = dateFilterTypes === DateFilterTypes.everything ? dateFilterTypes : `1 ${dateFilterTypes}`
                                        return(
                                            <SelectMenu.Item css="" onClick={() => {onFilter(dateFilterTypes)}}> 
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
                    <Box p={30} width={'100%'}>
                        <Text fontSize={2} color="text.secondary" textAlign="center">
                            There has a total of <Text as='span' fontWeight="bold" color="text.primary">{data.votes.length} votes</Text> been 
                            cast by <Text as='span' fontWeight="bold" color="text.primary">{uniqueAddress(data.votes).length} unique voters</Text>, 
                            with a total of <Text as='span' fontWeight="bold" color="text.primary">{totalVotingPower(data.votes)} voting power</Text>.
                            This comes down to a average of <Text as='span' fontWeight="bold" color="text.primary">{averageVotingPower(data.votes)} voting power</Text> for each backlog item that has been voted on.
                        </Text>
                    </Box>
                    <Box p={3} width={'100%'}>
                        <Timeline>    
                            {uniqueVoteByAddress(data.votes).map((v, i) => {
                                return (
                                    <Timeline.Item>
                                        <Timeline.Badge css="">
                                            <Avatar
                                                    src={makeBlockie(v.address)}
                                                    size={20}
                                                    alt={v.address}
                                                />
                                        </Timeline.Badge>
                                        <Timeline.Body>
                                            <Text as="p" fontSize={2} color="text.secondary">
                                                <Text as="span" color="text.primary">{v.address}</Text> has voted on <Text color="text.primary">{uniqueBacklogVotes(v.votes).length}</Text> items with a total of <Text color="text.primary">{v.amount}</Text> voting power
                                            </Text>
                                            {v.votes.map((vote) => {
                                                return ( <div> <VerifiedIcon /> <Text fontSize={1}>Voted on #{vote.number} with {vote.amount} voting power on {moment(vote.timestamp).format('MMM D, YYYY')}</Text><br /> </div>)
                                            })}
                                        </Timeline.Body>
                                    </Timeline.Item>
                                )
                            })}
                        </Timeline>
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
