import { ServiceResponse } from "server/ServiceResponse";
import { Backlog } from "types/Backlog";
import { BacklogItem } from "types/BacklogItem";
import { BacklogSettings } from "types/BacklogSettings";
import { Owner } from "types/Owner";
import { Vote } from "types/Vote";

export interface BacklogService {
    GetBacklogs(): Promise<ServiceResponse<Array<Backlog>>>;
    GetOwner(owner: string): Promise<ServiceResponse<Owner>>;
    GetBacklog(owner: string, id: string): Promise<ServiceResponse<Backlog>>;
    GetBacklogSettings(owner: string, id: string): Promise<ServiceResponse<BacklogSettings>>;
    GetBacklogItems(owner: string, id: string): Promise<ServiceResponse<Array<BacklogItem>>>;
    GetBacklogVotes(owner: string, id: string): Promise<ServiceResponse<Array<Vote>>>;
}
