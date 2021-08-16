import { Vote } from "src/types";
import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official"
import React from "react";
import { renderToStaticMarkup } from 'react-dom/server'
import makeBlockie from "ethereum-blockies-base64";
import { Avatar } from "@primer/components";


interface Props {
    votes: Array<Vote>
}

interface addressSummary {
    address : string,
    votes : number
}

export function VotesGraph(props: Props) {
    const addressSummary = uniqueVoteByAddress(props.votes)
    const votesData = addressSummary.map(i => i.votes)
    const addressData = addressSummary.map(i => i.address)

    function uniqueVoteByAddress(votes: Array<Vote>) : Array<addressSummary> {
        if(!votes)
            return []

        const addresses = uniqueAddress(votes)
        const summary = addresses.map((address) => {
            return {
                address: address,
                votes: addressVotes(votes, address)
            } as addressSummary
        })

        return summary.sort((a, b) => a.votes - b.votes).reverse().slice(0, 6)
    }

    function addressVotes(votes : Array<Vote>, address : string) : number{
        return votes.filter(i => i.address === address).length
    }

    function uniqueAddress(votes: Array<Vote>) : Array<string> {
        return [...new Set(votes.map((i) => i.address))]
    }

    Highcharts.AST.allowedReferences.push('data:')

    const graphOptions : Highcharts.Options = {
        chart: {
            width: 500,
            height: 250,
        },
        title: {
            text: ''
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Votes'
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{point.y} votes by ',
            footerFormat: '{point.key}',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{ 
            type: 'column',
            name: 'votes',
            data: votesData
        }],
        xAxis: {
            categories: addressData,
            labels: {
                useHTML: true,
                formatter: function(label) {
                    return  renderToStaticMarkup(<Avatar
                        src={makeBlockie(label.value.toString())}
                        size={20}
                        alt={label.value.toString()}
                      /> )
                      
                }
            }                
        }
    }

    return (<HighchartsReact highcharts={Highcharts} options={graphOptions} allowChartUpdate={false}/>)
}
