import { render } from '@testing-library/react'
import { AvatarUploadStateMachine } from './packages/StateMachine'
describe('App Component', () => {
  it('should render the initial step', () => {
    const { getByText } = render(<AvatarUploadStateMachine />)
    const title = getByText('Organization Logo')
    expect(title).toBeInTheDocument()
  })
})
