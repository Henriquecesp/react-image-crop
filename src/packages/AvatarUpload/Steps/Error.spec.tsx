import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { interpret } from 'xstate'
import { formMachine } from '../../StateMachine/machine'
import { ErrorStep } from './Error'

describe('Error Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const machine = formMachine.withConfig({})
  global.URL.createObjectURL = jest.fn()
  global.URL.revokeObjectURL = jest.fn()
  const props = {
    files: [
      Object.assign(new File([''], 'test.png', { type: 'image/png' }), {
        preview: 'test.png',
      }),
    ],
    setFiles: jest.fn(),
    sendEvent: jest.fn(),
  }

  it('should render the error step', () => {
    const { getByText } = render(<ErrorStep />)
    const title = getByText('Sorry, the upload failed.')
    const saveTitle = getByText('Try Again.')
    expect(title).toBeInTheDocument()
    expect(saveTitle).toBeInTheDocument()
  })

  it('should allow user to return to initial step by clicking in the try again button', () => {
    const stateMachine = interpret(machine)
    stateMachine.start()
    const { getByTestId } = render(<ErrorStep {...props} />)
    const closeButton = getByTestId('tryAgain')
    act(() => {
      fireEvent.click(closeButton)
    })

    expect(props.sendEvent).toBeCalledWith('RESET')
    expect(stateMachine.getSnapshot().value).toBe('initial')
  })
})
