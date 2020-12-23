import { Backlog } from "types/Backlog";
import { BacklogItem } from "types/BacklogItem";
import { BacklogSettings } from "types/BacklogSettings";
import { Owner } from "types/Owner";
import { Vote } from "types/Vote";
import { BacklogService } from "./BacklogService";

export class GithubService implements BacklogService {
    constructor() {
        console.log("Init GithubService");
    }

    public async GetBacklogs(): Promise<Backlog[]> {
        throw new Error("Method not implemented.");
    }

    public async GetOwner(owner: string): Promise<Owner> {
        throw new Error("Method not implemented.");
    }

    public async GetBacklog(owner: string, id: string): Promise<Backlog> {
        throw new Error("Method not implemented.");
    }

    public async GetBacklogSettings(owner: string, id: string): Promise<BacklogSettings> {
        throw new Error("Method not implemented.");
    }

    public async GetBacklogItems(owner: string, id: string): Promise<BacklogItem[]> {
        throw new Error("Method not implemented.");
    }

    public async GetBacklogVotes(owner: string, id: string): Promise<Vote[]> {
        throw new Error("Method not implemented.");
    }
}