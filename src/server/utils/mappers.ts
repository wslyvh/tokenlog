import { Backlog } from "types/Backlog";
import { BacklogSettings, VotingMethod } from "types/BacklogSettings";
import { Issue } from "types/Issue";
import { Label } from "types/Label";
import { Owner, OwnerType } from "types/Owner";

export function ToBacklog(data: any): Backlog { 
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        imageUrl: data.owner.avatarUrl,
        url: data.url,
        ownerName: data.owner.login,
        owner: ToOwner(data.owner),
        settings: JSON.parse(data.settings.data),
        labels: data.labels.nodes.map((label: any) => ToLabel(label)),
        issues: []
    }
}

export function ToOwner(data: any): Owner { 
    return {
        id: data.orgId ? data.orgId : data.userId,
        name: data.login,
        type: data.orgId ? OwnerType.ORGANIZATION : OwnerType.USER,
        url: data.url,
        avatarUrl: data.avatarUrl,
        repositories: [],
    }
}

export function ToLabel(data: any): Label { 
    return { 
        id: data.id,
        name: data.name,
        description: data.description,
        color: data.color,
    }
}

// export function ToIssue(data: any): Issue { 
//     return { 

//     }
// }

export function ToSettings(data: any): BacklogSettings { 
    return {
        votingMethod: VotingMethod.STANDARD,
        tokens: [],
        labels: [],
    }
}