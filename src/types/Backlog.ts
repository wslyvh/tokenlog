import { BacklogItem } from './BacklogItem'
import { BacklogSettings } from './BacklogSettings'

export interface Backlog {
  id: string
  type: string
  name: string
  description: string
  imageUrl: string
  url: string
  owner: string
  settings?: BacklogSettings
  items: Array<BacklogItem>
}
