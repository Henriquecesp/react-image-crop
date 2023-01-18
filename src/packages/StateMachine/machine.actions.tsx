import React from 'react'
import { assign } from 'xstate'
import { StepsProps } from '../../types/StepsProps'
import { CropStep, InitialStep } from '../AvatarUpload'
import { ErrorStep } from '../AvatarUpload/Steps/Error'
import { Context, Event, View } from './machine.types'

export const mapNameToView: Record<string, View> = {
  initial: {
    Component: <InitialStep />,
    step: 0,
  },
  error: {
    Component: <ErrorStep />,
    step: 1,
  },
  crop: {
    Component: <CropStep />,
    step: 2,
  },
  update: {
    Component: <InitialStep />,
    step: 3,
  },
}

export const changeView = assign<Context, Event>({
  currentView: (_context, _event, { action }) => {
    if (typeof action.payload !== 'string') {
      throw new Error('Action payload should be string')
    }

    return mapNameToView[action.payload]
  },
})
