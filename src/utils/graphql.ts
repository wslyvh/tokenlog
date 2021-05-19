import { graphql } from '@octokit/graphql'
import { SERVER_CONFIG } from './config'

export const graphqlWithAuth: any = graphql.defaults({
  headers: {
    authorization: 'token ' + SERVER_CONFIG.GITHUB_ACCESS_TOKEN,
  },
})
