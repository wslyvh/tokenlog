import { BacklogItem, Vote } from 'src/types'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export function useBacklogItems(id: string): Array<BacklogItem> {
  const { data, error } = useSWR(`/api/items?backlog=${id}`, fetcher)

  if (error) {
    console.log('Failed to load backlog votes', id)
    return []
  }
  if (!data) return []

  return data
}