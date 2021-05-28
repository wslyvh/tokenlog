import { Backlog } from 'src/types'

export interface TokenlogService {
  GetBacklogs(): Promise<Array<Backlog>>
}
