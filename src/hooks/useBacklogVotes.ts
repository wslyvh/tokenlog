import { Vote } from 'src/types'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const result = await response.json()
  const acceptedStatus = [200, 304]

  if (!acceptedStatus.includes(response.status)) {
    console.log(result.code, result.message)
    throw new Error(result.message)
  }

  return result.data
}

export function useBacklogVotes(id: string): Array<Vote> {
  const { data, error } = useSWR(`/api/votes?backlog=${id}`, fetcher)

  if (error) {
    console.log('Failed to load backlog votes', id)
    return []
  }
  if (!data) return []

  return data
}