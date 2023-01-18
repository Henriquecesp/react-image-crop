import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { interpret } from 'xstate'
import { formMachine } from '../../StateMachine/machine'
import { CropStep } from './Crop'

describe('Initial Component', () => {
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

  it('should render input to upload file', () => {
    const { getByText } = render(<CropStep />)
    const title = getByText('Crop')
    const saveTitle = getByText('Save')
    expect(title).toBeInTheDocument()
    expect(saveTitle).toBeInTheDocument()
  })

  it('should allow user to return to initial step by clicking the X button', () => {
    const stateMachine = interpret(machine)
    stateMachine.start()
    const { getByTestId } = render(<CropStep {...props} />)
    const closeButton = getByTestId('closeButton')
    act(() => {
      fireEvent.click(closeButton)
    })

    expect(props.sendEvent).toBeCalledWith('RESET')
    expect(stateMachine.getSnapshot().value).toBe('initial')
  })

  it('should have a save button that allows user to go to the next step', async () => {
    const { getByTestId } = render(<CropStep {...props} />)
    const saveButton = getByTestId('saveButton')

    const canvas = await screen.findByTestId('canvas')
    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(canvas).toBeInTheDocument()
      expect(props.setFiles).toBeCalled()
      expect(props.sendEvent).toBeCalledWith('NEXT')
    })
  })

  it('should have a slider that allows user to zoom in and out', async () => {
    const { getByTestId } = render(<CropStep {...props} />)
    const slider = getByTestId('slider')
    act(() => {
      fireEvent.change(slider, { target: { value: 50 } })
    })
    expect(slider.style.getPropertyValue('--val')).toBe('50')
  })

  it('should not change value if user enters a non-number', async () => {
    const { getByTestId } = render(<CropStep {...props} />)
    const slider = getByTestId('slider')
    act(() => {
      fireEvent.change(slider, { target: { value: 'abc' } })
    })
    expect(slider.style.getPropertyValue('--val')).not.toBe('abc')
  })
})
