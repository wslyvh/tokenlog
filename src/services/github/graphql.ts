import { graphql } from '@octokit/graphql'
import { APP_CONFIG } from '../../utils/config'

export const graphqlWithAuth: any = graphql.defaults({
  headers: {
    authorization: 'token ' + APP_CONFIG.GITHUB_ACCESS_TOKEN,
  },
})

const MAX_LIMIT = 100
const OWNER = `
    login
    avatarUrl
    url
    ... on Organization {
    orgId: id
    }
    ... on User {
    userId: id
}`

export function GET_REPOSITORY() {
  return `query GetRepository($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
            id
            name
            nameWithOwner
            description
            url
            owner {
                ${OWNER}
            }
            settings: object(expression: "master:tokenlog.json") {
                ... on Blob {
                    data: text
                }
            }
        }
    }`
}

export function GET_ISSUES(type: 'ISSUE' | 'PR') {
  let getIssues = ''
  let typeQuery = ''
  if (type === 'ISSUE') {
    getIssues = `query GetIssues($owner: String!, $repo: String!, $state: [IssueState!], $sort: IssueOrderField!, $order: OrderDirection!, $size: Int!) {`
    typeQuery = `issues(first: $size, orderBy: {field: $sort, direction: $order}, states: $state) {`
  }
  if (type === 'PR') {
    getIssues = `query GetIssues($owner: String!, $repo: String!, $state: [PullRequestState!], $sort: IssueOrderField!, $order: OrderDirection!, $size: Int!) {`
    typeQuery = `pullRequests(first: $size, orderBy: {field: $sort, direction: $order}, states: $state) {`
  }

  return `${getIssues}
        repository(owner: $owner, name: $repo) {
            id
            nameWithOwner
            ${typeQuery}
                totalCount
                nodes {
                    id
                    number
                    title
                    state
                    createdAt
                    updatedAt
                    closedAt
                    url
                    comments {
                    totalCount
                    }
                    labels(first: ${MAX_LIMIT}) {
                        nodes {
                            id
                            name
                            description
                            color
                        }
                    }
                }
            }
        }
    }`
}
