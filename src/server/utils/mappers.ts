import { Backlog, BacklogItem, BacklogSettings, Label, Owner } from 'types/v2';

export function ToBacklog(data: any): Backlog {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    imageUrl: data.owner.avatarUrl,
    url: data.url,
    ownerName: data.owner.login,
    owner: ToOwner(data.owner),
    settings: data.settings?.data ? (JSON.parse(data.settings.data) as BacklogSettings) : undefined,
    labels: data.labels?.nodes ? data.labels.nodes.map((label: any) => ToLabel(label)) : [],
    items: data.issues?.nodes ? data.issues.nodes.map((issue: any) => ToItem(issue)) : [],
  };
}

export function ToOwner(data: any): Owner {
  return {
    id: data.orgId ? data.orgId : data.userId,
    name: data.login,
    type: data.orgId ? 'ORGANIZATION' : 'USER',
    url: data.url,
    avatarUrl: data.avatarUrl,
    backlogs: [],
  };
}

export function ToLabel(data: any): Label {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    color: data.color,
  };
}

export function ToItem(source: any): BacklogItem {
  return {
    id: source.id,
    number: source.number,
    title: source.title,
    body: source.body,
    state: source.state,
    type: source.url?.includes('issues') ? 'ISSUE' : 'PR',
    created: new Date(source.createdAt),
    updated: new Date(source.updatedAt),
    closed: new Date(source.closedAt),
    url: source.url,
    labels: Array.from(source.labels).map((i) => ToLabel(i)),
    commentsCount: source.comments.totalCount,
    votes: [],
    voteCount: 0,
  };
}
