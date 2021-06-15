import { Button, Flex, Heading, Pagehead, SelectMenu } from "@primer/components"
import { CheckIcon } from "@primer/styled-octicons"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useVote } from "src/hooks/useVote"
import { Vote } from "src/types"

const Types  = {
    Week: "Week",
    Month: "Month",
    Forever: "Forever"
}

interface data {
    votes: Array<Vote>
    date: Date
    type: string
  }

export function InsightView() {
    const vote = useVote()
    const [data, setData] = useState<data>({
        votes: vote.backlogVotes,
        date: new Date(),
        type: Types.Month
      })

    useEffect(() => {
        onFilter(Types.Month)
      }, [])

    function onFilter(type: string) {
        if(!type || type === Types.Forever) {
            setData({
                date: firstVote(vote.backlogVotes).timestamp,
                votes: vote.backlogVotes,
                type: type
            })
        }
        else {
            const currentDate: Date = new Date()
            if(type === Types.Month) {
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

    function uniqueVoters(votes: Array<Vote>) : Array<string> {
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
        }).reverse()[0]
    }

    return(
        <div>
            <Pagehead>
                <Flex>
                    <Flex flexGrow={1} flexDirection="column">
                        <Heading fontSize={3}>
                            {moment(data.date).format("MMMM D, YYYY")} - {moment().format("MMMM D, YYYY")}
                        </Heading>
                    </Flex>
                    <Flex
                        width={125}
                        flexShrink={0}
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <SelectMenu css="">
                            <Button as="summary">Period</Button>
                            <SelectMenu.Modal css="" align="right">
                                <SelectMenu.Header css="">Filter activity</SelectMenu.Header>
                                <SelectMenu.List>
                                    {Object.keys(Types).map((i: string, index: number) => {
                                        const display = i === Types.Forever ? 'Everything' : '1 ' + i
                                        return(
                                            <SelectMenu.Item css="" onClick={() => {onFilter(i)}}> 
                                            {data.type === i && (<CheckIcon className="mr-2" />)} {display}</SelectMenu.Item>
                                        )
                                    })}
                                </SelectMenu.List>
                            </SelectMenu.Modal>
                        </SelectMenu>  
                    </Flex>
                </Flex>
            </Pagehead>
            {data.votes.length === 0 && (
                <div>
                    {data.type === 'Forever' && (
                        <span>There hasn’t been any voting activity.</span>
                    )}
                    {data.type !== 'Forever' && (
                        <span>There hasn’t been any voting activity in the last {data.type}.</span>
                    )}
                </div>
            )}
            {data.votes.length > 0 && (
                <div>
                    <p>{data.votes.length} total votesss.</p>
                    <p>{uniqueVoters(data.votes).length} unique voters</p>
                    <p>{totalVotingPower(data.votes)} total voting power</p>
                    <p>{averageVotingPower(data.votes)} average voting power</p>

                    <pre>{JSON.stringify(data.votes, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
