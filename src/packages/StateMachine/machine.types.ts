import React, { ReactNode } from 'react'
import { StateNode } from 'xstate'
import { StepsProps } from '../../types/StepsProps'

export type Event = { type: 'NEXT' } | { type: 'RESET' } | { type: 'ERROR' }

export type View = {
  Component: JSX.Element
  step: number
}

export type Context = {
  currentView: View
}

export type State = {
  states: {
    initial: StateNode
    error: StateNode
    crop: StateNode
    update: StateNode
  }
}
