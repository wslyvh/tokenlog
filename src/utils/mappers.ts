import {
  Backlog,
  BacklogItem,
  BacklogSettings,
  Label,
  Owner,
  VoteSummary,
} from 'src/types'

export function ToBacklog(source: any): Backlog {
  return {
    id: source.id,
    name: source.name,
    description: source.description,
    imageUrl: source.owner.avatarUrl,
    url: source.url,
    ownerName: source.owner.login,
    owner: ToOwner(source.owner),
    settings: source.settings?.data
      ? (JSON.parse(source.settings.data) as BacklogSettings)
      : null,
    labels: source.labels?.nodes
      ? source.labels.nodes.map((label: any) => ToLabel(label))
      : [],
    items: ToItems(source, []),
  }
}

export function ToOwner(source: any): Owner {
  return {
    id: source.orgId ? source.orgId : source.userId,
    name: source.login,
    type: source.orgId ? 'ORGANIZATION' : 'USER',
    url: source.url,
    avatarUrl: source.avatarUrl,
    backlogs: [],
  }
}

export function ToLabel(source: any): Label {
  return {
    id: source.id,
    name: source.name,
    description: source.description,
    color: source.color,
  }
}

export function ToItems(
  source: any,
  votes: Array<VoteSummary>
): Array<BacklogItem> {
  if (source.issues?.nodes) {
    return source.issues.nodes.map((issue: any) =>
      ToItem(
        issue,
        votes.find((v) => v.number === issue.number)
      )
    )
  }
  if (source.pullRequests?.nodes) {
    return source.pullRequests.nodes.map((pr: any) =>
      ToItem(
        pr,
        votes.find((v) => v.number === pr.number)
      )
    )
  }

  return []
}

export function ToItem(
  source: any,
  summary: VoteSummary | undefined
): BacklogItem {
  return {
    id: source.id,
    number: source.number,
    title: source.title,
    state: source.state,
    type: source.url?.includes('issues') ? 'ISSUE' : 'PR',
    created: new Date(source.createdAt),
    updated: new Date(source.updatedAt),
    closed: new Date(source.closedAt),
    url: source.url,
    labels: Array.from(source.labels).map((i) => ToLabel(i)),
    commentsCount: source.comments.totalCount,
    voteSummary: summary,
    votes: [],
  }
}
