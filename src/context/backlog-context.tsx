import React, { createContext, ReactNode, useState } from 'react'
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
