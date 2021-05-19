import { Backlog } from './'

export interface Owner {
  id: string
  name: string
  type: 'USER' | 'ORGANIZATION'
  url: string
  avatarUrl: string
  backlogs: Array<Backlog>
}
