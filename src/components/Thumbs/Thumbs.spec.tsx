import { render, waitFor } from '@testing-library/react'
import { Thumbs } from './Thumbs'

describe('Initial Component', () => {
  global.URL.createObjectURL = jest.fn()
  global.URL.revokeObjectURL = jest.fn()
  const props = {
    files: [
      Object.assign(new File([''], 'test.png', { type: 'image/png' }), {
        preview: 'test.png',
      }),
    ],
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the children', () => {
    const { getByTestId } = render(
      <Thumbs {...props}>
        <div data-testid='children'>Children</div>
      </Thumbs>,
    )
    const children = getByTestId('children')
    expect(children).toBeInTheDocument()
  })

  it('should render the image', () => {
    const { getByTestId } = render(<Thumbs {...props} />)
    const image = getByTestId('image')
    expect(image).toBeInTheDocument()
  })

  it('should render the correct background color when attention prop is pass', () => {
    const { getByTestId } = render(<Thumbs {...props} attention />)

    const thumbInner = getByTestId('thumbInner')
    expect(thumbInner).toHaveStyle('background-color: #C3CBD5')
  })

  it('should render the correct background color white when attention prop is false', () => {
    const { getByTestId } = render(<Thumbs {...props} />)

    const thumbInner = getByTestId('thumbInner')
    expect(thumbInner).toHaveStyle('background-color: #fff')
  })
})
