import { MachineConfig, MachineOptions, createMachine } from 'xstate'

import { mapNameToView, changeView } from './machine.actions'
import { State, Context, Event } from './machine.types'

const initialStateName = 'initial'

const formMachineConfig: MachineConfig<Context, State, Event> = {
  id: 'formState',
  predictableActionArguments: true,
  initial: initialStateName,
  context: {
    currentView: mapNameToView[initialStateName],
  },
  states: {
    initial: {
      on: {
        NEXT: { target: 'crop', actions: { type: 'changeView', payload: 'crop' } },
        ERROR: { target: 'error', actions: { type: 'changeView', payload: 'error' } },
      },
    },
    error: {
      on: {
        RESET: { target: 'initial', actions: { type: 'changeView', payload: 'initial' } },
      },
    },
    crop: {
      on: {
        RESET: { target: 'initial', actions: { type: 'changeView', payload: 'initial' } },
        NEXT: { target: 'update', actions: { type: 'changeView', payload: 'update' } },
        ERROR: { target: 'error', actions: { type: 'changeView', payload: 'error' } },
      },
    },
    update: {
      on: {
        RESET: { target: 'initial', actions: { type: 'changeView', payload: 'initial' } },
        ERROR: { target: 'error', actions: { type: 'changeView', payload: 'error' } },
      },
    },
  },
}

const formMachineOptions: Partial<MachineOptions<Context, Event>> = {
  actions: { changeView },
}

export const formMachine = createMachine(formMachineConfig, formMachineOptions)

export const formMachineStates = Object.keys(formMachine.states)
