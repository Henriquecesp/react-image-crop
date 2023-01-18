import React, { useRef } from 'react'
import styled from 'styled-components'
import { CloseIcon } from '../../../assets/CloseIcon'
import { Container } from '../../../components/AvatarUploadContainer'
import { Slider } from '../../../components/Slider'
import { Thumbs } from '../../../components/Thumbs/Thumbs'
import { ThumbsContainer } from '../../../components/Thumbs/ThumbsContainer'
import { Typography } from '../../../components/Typography'
import { StepsProps } from '../../../types/StepsProps'
import { Button } from '../../../components/Button'
import ZoomImage from '../../../components/ZoomImage/ZoomImage'
import { FileWithPreview } from '../../../types/Files'
import { Flex } from '../../../components/Flex'

const MAX_ZOOM = 5
const MIN_ZOOM = 0.1

export const CropStep = ({ files, sendEvent, setFiles }: StepsProps): JSX.Element => {
  const [value, setValue] = React.useState(50)
  const [zoom, setZoom] = React.useState(1)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)

    if (Number.isNaN(value)) {
      return
    }

    setValue(value)
    setZoom(clamp(value / 100, MIN_ZOOM, MAX_ZOOM))
  }

  const handleSave = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return
      const blobUrl = URL.createObjectURL(blob)

      if (!files) return
      setFiles?.([
        {
          ...files[0],
          preview: blobUrl,
        },
      ] as FileWithPreview[])
    })
    sendEvent?.('NEXT')
  }

  return (
    <Container>
      {Array.isArray(files) && files.length === 1 && (
        <ThumbsContainer>
          <Thumbs files={files}>
            <ZoomImage
              image={files[0].preview}
              zoom={zoom}
              setZoom={setZoom}
              clamp={clamp}
              canvasRef={canvasRef}
            />
          </Thumbs>
        </ThumbsContainer>
      )}
      <Flex direction='column' alignItems='flex-start'>
        <Typography
          level='span'
          color='gray'
          size='medium'
          style={{
            letterSpacing: '-0.02em',
            marginTop: 16,
          }}
        >
          Crop
        </Typography>
        <Slider
          data-testid='slider'
          onInput={handleChange}
          style={{
            width: '276px',
            '--min': 0,
            '--max': 100,
            '--val': value,
          }}
        />
        <Flex direction='row' justifyContent='flex-end' style={{ width: '100%', marginTop: 22 }}>
          <Button
            data-testid='saveButton'
            onClick={() => {
              handleSave()
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
      <Flex
        justifyContent='flex-end'
        alignItems='flex-start'
        style={{
          height: '100%',
        }}
      >
        <Button
          icon
          data-testid='closeButton'
          onClick={() => {
            setFiles?.([])
            sendEvent?.('RESET')
          }}
        >
          <CloseIcon />
        </Button>
      </Flex>
    </Container>
  )
}
