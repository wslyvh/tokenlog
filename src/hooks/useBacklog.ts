import { useContext } from 'react'
import { BacklogContext } from 'src/context/backlog-context'

export function useBacklog() {
  const context = useContext(BacklogContext)

  // if (context === undefined) {
  //   throw new Error('useBacklog must be used within a BacklogProvider')
  // }

  return context
}
