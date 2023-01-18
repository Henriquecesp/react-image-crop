import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { interpret } from 'xstate'
import { formMachine } from '../../StateMachine/machine'
import { InitialStep } from './Initial'

beforeEach(() => jest.clearAllMocks())

describe('Initial Component', () => {
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
    const { getByTestId } = render(<InitialStep />)
    const fileInput = getByTestId('fileInput')
    expect(fileInput).toBeInTheDocument()
  })

  it('should be able to upload image and send to next step on xstate machine', async () => {
    const { getByTestId } = render(<InitialStep />)
    const stateMachine = interpret(machine)
    stateMachine.start()
    expect(stateMachine.getSnapshot().value).toBe('initial')
    const fileInput = getByTestId('fileInput')
    const file = new File(['file'], 'test.png', { type: 'image/png' })
    userEvent.upload(fileInput, file)
    await waitFor(() => {
      expect(fileInput).toHaveValue('C:\\fakepath\\test.png')
      // act
      stateMachine.send('NEXT')
      // expec the next step to be crop
      expect(stateMachine.getSnapshot().value).toBe('crop')
    })
  })

  it('should revoke the object url on unmount', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const { unmount } = render(
      <InitialStep
        files={[
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ]}
      />,
    )
    await waitFor(() => {
      unmount()
      expect(URL.revokeObjectURL).toHaveBeenCalled()
    })
  })

  it('should step to error state if file is not an image', async () => {
    const { getByTestId } = render(<InitialStep {...props} />)
    const stateMachine = interpret(machine)
    stateMachine.start()
    expect(stateMachine.getSnapshot().value).toBe('initial')
    const fileInput = getByTestId('fileInput')
    const file = new File(['file'], 'test.mp3', { type: 'text/plain' })
    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } })
    })
    await waitFor(() => {
      // act
      stateMachine.send('ERROR')
      // expec the next step to be crop
      expect(stateMachine.getSnapshot().value).toBe('error')
      expect(props.sendEvent).toBeCalledWith('ERROR')
    })
  })
})
