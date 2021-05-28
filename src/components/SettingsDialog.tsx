import React from 'react'
import { GearIcon } from '@primer/styled-octicons'
import { Box, Dialog } from '@primer/components'
import { BacklogSettings } from 'src/types'
import { SECONDARY_COLOR } from 'src/utils/constants'

interface Props {
  settings: BacklogSettings
}

export function SettingsDialog(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const returnFocusRef = React.useRef(null)

  return (
    <div>
      <span role="button" ref={returnFocusRef} onClick={() => setIsOpen(true)}>
        <GearIcon
          aria-label="Backlog settings"
          color={SECONDARY_COLOR}
          size={16}
        />
      </span>

      <Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">Configuration</Dialog.Header>
        <Box p={3}>
          <pre>{JSON.stringify(props.settings, null, 2)}</pre>
        </Box>
      </Dialog>
    </div>
  )
}
