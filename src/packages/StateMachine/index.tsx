import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import { formMachine } from './machine'
import { Event as EventMachine } from './machine.types'
import { FileWithPreview } from '../../types/Files'
import { Event } from 'xstate'
import { StepsProps } from '../../types/StepsProps'

export const AvatarUploadStateMachine = ({ files, setFiles }: StepsProps): JSX.Element => {
  const [state, send] = useMachine(formMachine)

  const sendEvent = (event: Event<EventMachine>) => {
    send(event)
  }

  return (
    <>
      {React.cloneElement(state.context.currentView.Component, {
        files,
        setFiles,
        sendEvent,
      })}
    </>
  )
}
