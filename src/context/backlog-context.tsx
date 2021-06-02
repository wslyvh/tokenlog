import React, { createContext, ReactNode, useState } from 'react'
import { Backlog } from 'src/types'

interface Props {
  backlog: Backlog
  children: ReactNode
}

export const BacklogContext = createContext<Backlog | undefined>(undefined)

export function BacklogContextProvider(props: Props) {
  const [backlog, setBacklog] = useState<Backlog>(props.backlog)

  return (
    <BacklogContext.Provider value={backlog}>
      {props.children}
    </BacklogContext.Provider>
  )
}
