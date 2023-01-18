import { fireEvent, render, renderHook, waitFor } from '@testing-library/react'
import { useRef } from 'react'
import { act } from 'react-dom/test-utils'
import ZoomImage from './ZoomImage'

interface Props {
  image: string
  setZoom: React.Dispatch<React.SetStateAction<number>>
  zoom: number
  clamp: (num: number, min: number, max: number) => number
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

describe('App Component', () => {
  const props: Props = {
    image: 'teste',
    setZoom: jest.fn(),
    zoom: 1,
    clamp: jest.fn(),
    canvasRef: { current: null },
  }

  it('should render the canvas to zoom in', () => {
    const { getByTestId } = render(<ZoomImage {...props} />)
    const canvas = getByTestId('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should change the zoom level on mouse wheel', () => {
    const { getByTestId } = render(<ZoomImage {...props} />)
    const canvas = getByTestId('canvas')
    act(() => {
      fireEvent.wheel(canvas, { deltaY: 1 })
    })
    expect(props.setZoom).toHaveBeenCalled()
  })

  it('should draw the image on canvas', async () => {
    const { getByTestId } = render(<ZoomImage {...props} />)
    const canvas = getByTestId('canvas') as HTMLCanvasElement
    const image = document.createElement('img')
    await waitFor(() => {
      image.src = props.image
      expect(canvas).toBeInTheDocument()
      expect(canvas.getContext('2d')?.drawImage).toBeCalledWith(image, 150, 75)
    })
  })

  // dummy tests

  // it('should change background position on mouse move', () => {
  //   const { getByTestId } = render(<ZoomImage {...props} />)
  //   const canvas = getByTestId('canvas')
  //   act(() => {
  //     fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 })
  //     fireEvent.mouseMove(canvas, { clientX: 10, clientY: 10 })
  //   })
  // })

  // it('should stop dragging on mouse up', () => {
  //   const { getByTestId } = render(<ZoomImage {...props} />)
  //   const canvas = getByTestId('canvas')
  //   act(() => {
  //     fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 })
  //     fireEvent.mouseUp(canvas)
  //   })
  // })
})
