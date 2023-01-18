import React, { useRef, useMemo, useEffect, useState } from 'react'

const SCROLL_SENSITIVITY = 0.0005
const MAX_ZOOM = 5
const MIN_ZOOM = 0.1

interface Props {
  image: string
  setZoom: React.Dispatch<React.SetStateAction<number>>
  zoom: number
  clamp: (num: number, min: number, max: number) => number
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const ZoomImage = ({ image, zoom, setZoom, clamp, canvasRef }: Props) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [draggind, setDragging] = useState(false)

  const touch = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const observer = useRef<ResizeObserver | null>(null)
  const background = useMemo(() => new Image(), [image])

  const handleWheel: React.WheelEventHandler<HTMLCanvasElement> = (event) => {
    const { deltaY } = event
    if (!draggind) {
      setZoom((zoom) => clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM))
    }
  }

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (draggind) {
      const { x, y } = touch.current
      const { clientX, clientY } = event
      setOffset({
        x: offset.x + (x - clientX),
        y: offset.y + (y - clientY),
      })
      touch.current = { x: clientX, y: clientY }
    }
  }

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { clientX, clientY } = event
    touch.current = { x: clientX, y: clientY }
    setDragging(true)
  }

  const handleMouseUp = () => setDragging(false)

  const draw = () => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current
      const context = canvasRef.current.getContext('2d')

      // Set canvas dimensions
      canvasRef.current.width = width
      canvasRef.current.height = height

      // Clear canvas and scale it
      context?.translate(-offset.x, -offset.y)
      context?.scale(zoom, zoom)
      context?.clearRect(0, 0, width, height)

      if (context) {
        // Make sure we're zooming to the center
        const x = (context.canvas.width / zoom - background.width) / 2
        const y = (context.canvas.height / zoom - background.height) / 2

        // Draw image
        context.drawImage(background, x, y)
      }
    }
  }

  useEffect(() => {
    if (observer.current) {
      observer.current = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const { width, height } = background
          // If width of the container is smaller than image, scale image down
          if (target.clientWidth < width) {
            // Calculate scale
            const scale = target.clientWidth / width
            if (canvasRef.current) {
              // Redraw image
              canvasRef.current.width = width * scale
              canvasRef.current.height = height * scale
              canvasRef.current
                ?.getContext('2d')
                ?.drawImage(background, 0, 0, width * scale, height * scale)
            }
          }
        })
      })
      if (containerRef.current) {
        observer.current.observe(containerRef.current)
      }
    }

    return () => {
      if (observer.current && containerRef.current) observer.current.unobserve(containerRef.current)
    }
  }, [])

  useEffect(() => {
    background.src = image

    if (canvasRef.current) {
      background.onload = () => {
        if (!canvasRef.current) return
        // Get the image dimensions
        canvasRef.current.width = 114
        canvasRef.current.height = 114

        // Set image as background
        canvasRef.current?.getContext('2d')?.drawImage(background, 0, 0)
      }
    }
  }, [background])

  useEffect(() => {
    draw()
  }, [zoom, offset])

  return (
    <div ref={containerRef}>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        data-testid='canvas'
      />
    </div>
  )
}

export default ZoomImage
