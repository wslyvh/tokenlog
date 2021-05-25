import mongoose from 'mongoose'
import OldVoteModel from 'src/models/OldVoteModel'
import VoteModel from 'src/models/VoteModel'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SERVER_CONFIG } from 'src/utils/config'
import { DB_OPTIONS } from 'src/utils/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('connect v1')
    await mongoose.connect(process.env.REACT_APP_DB_CONNECTIONSTRING_OLD, DB_OPTIONS)
    const v1models = await OldVoteModel.find()
    console.log(v1models.length, 'votes on OLD db')
    await mongoose.disconnect()

    console.log('connect v2')
    await mongoose.connect(SERVER_CONFIG.DB_CONNECTIONSTRING, DB_OPTIONS)
    let v2models = await VoteModel.find()
    console.log(v2models.length, 'votes on new DB')
    
    const v2Models = v1models.map((i) => { 
        const org = i.org === 'tecommons' ? 'commonsbuild' : i.org
        return {
            id: `gh:${org}/${i.repo}`,
            number: i.number,
            state: i.closed ? 'CLOSED' : 'OPEN',
            address: i.address,
            amount: i.cost,
            signature: i.signature,
            timestamp: i.timestamp
        }
    })
    // console.log(v2Models)

    const results = await VoteModel.create(v2models)
    console.log('RESULTS', results)

    v2models = await VoteModel.find()
    console.log(v2models.length)
    await mongoose.disconnect()

    res.status(200).json('Ok')
}
