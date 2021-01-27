const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const LABELS = `labels(first: ${MAX_LIMIT}) {
    nodes {
        id
        name
        description
        color
    }
}`;
const OWNER = `
    login
    avatarUrl
    url
    ... on Organization {
    orgId: id
    }
    ... on User {
    userId: id
}`;

export function GET_OWNER() {
  return `query GetOwner($owner: String!) {
        repositoryOwner(login: $owner) {
            ${OWNER}
        }
    }`;
}

export function GET_REPOSITORY(withLabels: boolean) {
  const labels = withLabels ? LABELS : '';

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
            ${labels}
        }
    }`;
}

// issues(states: OPEN, first: ${DEFAULT_LIMIT}, orderBy: {field: CREATED_AT, direction: DESC}) {
//     totalCount
//     nodes {
//         id
//         number
//         title
//         body
//         state
//         createdAt
//         updatedAt
//         closedAt
//         url
//         comments {
//           totalCount
//         }
//         labels(first: ${MAX_LIMIT}) {
//             nodes {
//                 id
//                 name
//                 description
//                 color
//             }
//         }
//     }
// }
