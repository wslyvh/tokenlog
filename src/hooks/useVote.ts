import { useContext } from 'react'
import { VoteContext } from 'src/context/vote-context'

export function useVote() {
  const context = useContext(VoteContext)

  if (context === undefined) {
    throw new Error('useVote must be used within a VoteProvider')
  }

  return context
}
