import { Backlog } from "types/Backlog";
import { BacklogItem, ItemType } from "types/BacklogItem";
import { BacklogSettings, VotingMethod } from "types/BacklogSettings";
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
        settings: JSON.parse(data.settings.data) as BacklogSettings,
        labels: data.labels.nodes.map((label: any) => ToLabel(label)),
        items: data.issues ? data.issues.nodes.map((issue: any) => ToItem(issue)) : []
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

export function ToItem(source: any): BacklogItem { 
    return { 
        id: source.id,
        number: source.number,
        title: source.title,
        body: source.body,
        state: source.state,
        type: source.url?.includes('issues') ? ItemType.ISSUE : ItemType.PR,
        created: new Date(source.createdAt),
        updated: new Date(source.updatedAt),
        closed: new Date(source.closedAt),
        url: source.url,
        labels: Array.from(source.labels).map((i) => ToLabel(i)),
        commentsCount: source.comments.totalCount,
        votes: [],
        voteCount: 0
    }
}

export function ToSettings(data: any): BacklogSettings { 
    return {
        votingMethod: VotingMethod.STANDARD,
        tokens: [],
        labels: [],
    }
}