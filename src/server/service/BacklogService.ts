import { Backlog } from "types/Backlog";
import { BacklogItem } from "types/BacklogItem";
import { Owner } from "types/Owner";
import { Vote } from "types/Vote";

export interface BacklogService {
    GetBacklogs(): Promise<Array<Backlog>>;
    GetOwner(owner: string): Promise<Owner>;
    GetBacklog(owner: string, id: string): Promise<Backlog>;
    GetBacklogItems(owner: string, id: string): Promise<Array<BacklogItem>>;
    GetBacklogVotes(owner: string, id: string): Promise<Array<Vote>>;
}
