import VoteModel from "server/models/VoteModel";
import { ServiceResponse } from "server/ServiceResponse";
import { graphqlWithAuth } from "server/utils/graphql";
import { GET_REPOSITORY } from "server/utils/queries";
import { ToBacklog } from "server/utils/mappers";
import { Backlog } from "types/Backlog";
import { BacklogItem } from "types/BacklogItem";
import { BacklogSettings } from "types/BacklogSettings";
import { Owner } from "types/Owner";
import { Vote } from "types/Vote";
import { BacklogService } from "./BacklogService";
import { BaseService } from "./BaseService";

export class GithubService extends BaseService implements BacklogService {
    constructor() {
        super();

        console.log("Init GithubService");
    }

    public async GetBacklogs(): Promise<ServiceResponse<Array<Backlog>>> {
        try {
            await this.Connect();

            const aggregated = await VoteModel.aggregate([
                { $group: { 
                    _id: { org: '$org', repo: '$repo' },
                    // totalAmount: { $sum: '$amount' },
                    // count: { $sum: 1 }
                } }
            ]);

            return {
                code: 200,
                message: '',
                data: aggregated.map((i) => {
                    // console.log("I", i);
                    return {
                        owner: i._id.org,
                        id: i._id.repo
                    } as Backlog
                })
            }
        } catch (ex) {
            console.error(ex);
        }
    
        return {
            code: -1,
            message: '',
            data: undefined
        }
    }

    public async GetOwner(owner: string): Promise<ServiceResponse<Owner>> {
        if (!owner) return this.BadRequest();

        throw new Error("Method not implemented.");
    }

    public async GetBacklog(owner: string, id: string): Promise<ServiceResponse<Backlog>> {
        if (!owner || !id) return this.BadRequest();

        try {
            const response: any = await graphqlWithAuth(GET_REPOSITORY, {
                owner: owner,
                repo: id
            });
            
            return {
                code: 200,
                message: '',
                data: ToBacklog(response.repository)
            }
        }
        catch (e) { 
            console.error(e);
        }

        throw new Error("Method not implemented.");
    }

    public async GetBacklogSettings(owner: string, id: string): Promise<ServiceResponse<BacklogSettings>> {
        if (!owner || !id) return this.BadRequest();

        throw new Error("Method not implemented.");
    }

    public async GetBacklogItems(owner: string, id: string): Promise<ServiceResponse<Array<BacklogItem>>> {
        if (!owner || !id) return this.BadRequest();
        
        throw new Error("Method not implemented.");
    }

    public async GetBacklogVotes(owner: string, id: string): Promise<ServiceResponse<Array<Vote>>> {
        if (!owner || !id) return this.BadRequest();
        
        throw new Error("Method not implemented.");
    }
}