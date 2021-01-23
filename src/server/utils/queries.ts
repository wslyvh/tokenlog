const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export const GET_REPOSITORY = `query GetRepository($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
        id
        name
        nameWithOwner
        description
        url
        owner {
            login
            avatarUrl
            url
            ... on Organization {
              orgId: id
            }
            ... on User {
              userId: id
            }
        }
        settings: object(expression: "master:tokenlog.json") {
            ... on Blob {
                data: text
            }
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
}`


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