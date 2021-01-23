import { graphqlWithAuth } from "server/utils/graphql";
import { GET_REPOSITORY } from "server/utils/queries";
import { ToBacklog } from "server/utils/mappers";
import { Backlog } from "types/Backlog";
import { BacklogItem } from "types/BacklogItem";
import { Vote } from "types/Vote";
import { BacklogService } from "./BacklogService";
import { BaseService } from "./BaseService";
import { Owner } from "types/Owner";
import VoteModel from "server/models/VoteModel";

export class GithubService extends BaseService implements BacklogService {

    public async GetBacklogs(): Promise<Array<Backlog>> {
        try {
            await this.Connect();

            const aggregated = await VoteModel.aggregate([
                { $group: { 
                    _id: { org: '$org', repo: '$repo' },
                    // totalAmount: { $sum: '$amount' },
                    // count: { $sum: 1 }
                } }
            ]);

            return aggregated.map((i) => {
                return {
                    owner: i._id.org,
                    id: i._id.repo
                } as Backlog
            })
        } catch (ex) {
            console.error(ex);
            
            throw new Error(`Unable to get repositories`);
        }
    }

    public async GetOwner(owner: string): Promise<Owner> {
        if (!owner) throw new Error("Properties are empty or undefined.");

        throw new Error("Method not implemented.");
    }

    public async GetBacklog(owner: string, id: string): Promise<Backlog> {
        if (!owner || !id) throw new Error("Properties are empty or undefined.");

        try { 
            const response: any = await graphqlWithAuth(GET_REPOSITORY, {
                owner: owner,
                repo: id
            });
            
            return ToBacklog(response.repository);
        }
        catch (e) { 
            console.error(e);

            throw new Error(`Unable to get repository ${owner}/${id}`);
        }
    }

    public async GetBacklogItems(owner: string, id: string): Promise<Array<BacklogItem>> {
        if (!owner || !id) throw new Error("Properties are empty or undefined.");
        
        throw new Error("Method not implemented.");
    }

    public async GetBacklogVotes(owner: string, id: string): Promise<Array<Vote>> {
        if (!owner || !id) throw new Error("Properties are empty or undefined.");
        
        throw new Error("Method not implemented.");
    }
}