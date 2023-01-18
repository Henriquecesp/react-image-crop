import React from 'react'
import { Event } from 'xstate'
import { FileWithPreview } from './Files'
import { Event as EventMachine } from '../packages/StateMachine/machine.types'

export interface StepsProps {
  files?: FileWithPreview[]
  setFiles?: React.Dispatch<FileWithPreview[]>
  sendEvent?: (event: Event<EventMachine>) => void
}
