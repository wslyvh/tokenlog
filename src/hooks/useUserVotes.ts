import { Vote } from 'src/types'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const result = await response.json()

  if (response.status !== 200) {
    console.log(result.code, result.message)
    throw new Error(result.message)
  }

  return result.data
}

export function useUserVotes(id: string, address: string): Array<Vote> {
  const { data, error } = useSWR(
    `/api/uservotes?backlog=${id}&address=${address}`,
    fetcher
  )

  if (error) {
    console.log('Failed to load userVotes')
    return []
  }
  if (!data) return []

  return data
}
