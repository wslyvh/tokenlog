import { Avatar, Timeline, Text } from "@primer/components"
import { DatabaseIcon, VerifiedIcon } from "@primer/styled-octicons"
import makeBlockie from "ethereum-blockies-base64"
import moment from "moment"
import React from "react"
import { Vote } from "src/types"

interface Props {
    type: 'address' | 'backlogItem',
    items: Array<InsightTimelineItem>
}

export interface InsightTimelineItem {
    name: string,
    votes: Array<Vote>,
    votingPower: number,
    amount: number
}

export function InsightTimeline(props: Props) {
    if(props.items.length === 0)
        return (<div>Nothing found</div>)

    if(props.type === 'address')
        return (
            <Timeline>
                {props.items.map((item, index) => {
                    return (
                        <Timeline.Item key={index}>
                            <Timeline.Badge css="">
                                <Avatar
                                    src={makeBlockie(item.name)}
                                    size={20}
                                    alt={item.name} />
                                    
                            </Timeline.Badge>
                            <Timeline.Body>
                                <Text as="p" fontSize={2} color="text.secondary">
                                    <Text as="span" color="text.primary">{item.name}</Text> has voted on <Text color="text.primary">{item.amount}</Text> items with a total of <Text color="text.primary">{item.votingPower}</Text> voting power
                                </Text>
                                {item.votes.map((vote, i) => {
                                    return (
                                        <div key={i}> 
                                            <VerifiedIcon /> <Text fontSize={1}>Voted on #{vote.number} with {vote.amount} voting power on {moment(vote.timestamp).format('MMM D, YYYY')}</Text><br /> 
                                        </div>
                                    )
                                })}
                            </Timeline.Body>
                        </Timeline.Item>
                    )
                })}
            </Timeline>
        )

        if(props.type === 'backlogItem')
            return (
                <Timeline>
                    {props.items.map((item, index) => {
                        return (
                            <Timeline.Item key={index}>
                                <Timeline.Badge css="">
                                    <DatabaseIcon />
                                </Timeline.Badge>
                                <Timeline.Body>
                                    <Text as="p" fontSize={2} color="text.secondary">
                                        {item.amount === 1 && (
                                            <Text>
                                                <Text color="text.primary">{item.amount}</Text> voter has voted on item #<Text as="span" color="text.primary">{item.name}</Text> with a total of <Text color="text.primary">{item.votingPower}</Text> voting power
                                            </Text>
                                        )}
                                        {item.amount > 1 && (
                                            <Text>
                                                <Text color="text.primary">{item.amount}</Text> unique voters has voted on item #<Text as="span" color="text.primary">{item.name}</Text> with a total of <Text color="text.primary">{item.votingPower}</Text> voting power
                                            </Text>
                                        )}
                                    </Text>
                                    {item.votes.map((vote, i) => {
                                        return (
                                            <div key={i}> 
                                                <VerifiedIcon /> <Text fontSize={1}>Voted by <Avatar src={makeBlockie(vote.address)} size={20} alt={vote.address} /> with {vote.amount} voting power on {moment(vote.timestamp).format('MMM D, YYYY')}</Text><br /> 
                                            </div>
                                        )
                                    })}
                                </Timeline.Body>
                            </Timeline.Item>
                        )
                    })}
                </Timeline>
            )

        return (<div>Type unknown</div>)
}
