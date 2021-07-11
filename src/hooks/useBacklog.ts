import { useBacklogContext } from './useBacklogContext'

export function useBacklog() {
  return useBacklogContext().backlog
}
