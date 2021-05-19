import { BacklogItem } from './BacklogItem'
import { BacklogSettings } from './BacklogSettings'
import { Label } from './Label'
import { Owner } from './Owner'

export interface Backlog {
  id: string
  name: string
  description: string
  imageUrl: string
  url: string
  ownerName: string
  owner?: Owner
  settings?: BacklogSettings
  labels: Array<Label>
  items: Array<BacklogItem>
}
