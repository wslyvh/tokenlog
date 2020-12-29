import { ServiceResponse } from "server/ServiceResponse";
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
        throw new Error("Method not implemented.");
    }

    public async GetOwner(owner: string): Promise<ServiceResponse<Owner>> {
        if (!owner) return this.BadRequest();

        throw new Error("Method not implemented.");
    }

    public async GetBacklog(owner: string, id: string): Promise<ServiceResponse<Backlog>> {
        if (!owner || !id) return this.BadRequest();

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