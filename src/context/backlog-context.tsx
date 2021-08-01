import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useBacklogItems } from 'src/hooks/useBacklogItems'
import { Backlog } from 'src/types'

interface BacklogContextType {
  backlog: Backlog
  setBacklog: (backlog: Backlog) => void
}

export const BacklogContext = createContext<BacklogContextType | undefined>(undefined)

interface Props {
  backlog: Backlog
  children: ReactNode
}

export function BacklogContextProvider(props: Props) {
  const [backlog, setBacklog] = useState<Backlog>(props.backlog)
  const backlogItems = useBacklogItems(backlog.id)

  useEffect(() => {
    if (backlogItems && backlogItems.length > 0) {
      setBacklog({
        ...backlog,
        items: backlogItems
      })
    }
  }, [backlogItems])

  function updateBacklog(backlog: Backlog) { 
    setBacklog({...backlog})
  }

  return (
    <BacklogContext.Provider value={{
      backlog,
      setBacklog: updateBacklog
    }}>
      {props.children}
    </BacklogContext.Provider>
  )
}
