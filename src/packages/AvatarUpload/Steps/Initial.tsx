import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { Container } from '../../../components/AvatarUploadContainer'
import { Typography } from '../../../components/Typography'
import { StepsProps } from '../../../types/StepsProps'
import { MediaIcon } from '../../../assets/MediaIcon'
import { ThumbsContainer } from '../../../components/Thumbs/ThumbsContainer'
import { Thumbs } from '../../../components/Thumbs/Thumbs'

const ContentSection = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TitleWithIconFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const InitialStep = ({ files, setFiles, sendEvent }: StepsProps): JSX.Element => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },

    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (Array.isArray(files) && files.length > 0) {
        sendEvent?.('RESET')
      }
      setFiles?.(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      sendEvent?.('NEXT')
    },
    onDropRejected: (err) => {
      console.log(err)
      sendEvent?.('ERROR')
    },
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        {Array.isArray(files) && files.length > 0 && (
          <ThumbsContainer>
            <Thumbs files={files} />
          </ThumbsContainer>
        )}
        <ContentSection>
          <input data-testid='fileInput' {...getInputProps()} />
          <TitleWithIconFlex>
            <MediaIcon />
            <Typography level='span' color='dark' size='small' fontWeight={500}>
              Organization Logo
            </Typography>
          </TitleWithIconFlex>
          <Typography level='span' color='gray' size='medium'>
            Drop the image here or click to browse.
          </Typography>
        </ContentSection>
      </Container>
    </>
  )
}
