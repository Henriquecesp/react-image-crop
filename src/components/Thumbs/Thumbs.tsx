import React from 'react'
import styled from 'styled-components'
import { FileWithPreview } from '../../types/Files'

const Thumb = styled.div`
  display: inline-flex;
  width: 114px;
  height: 114px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

const ThumbInner = styled.div`
  display: flex;
  minwidth: 0;
  overflow: hidden;
  border-radius: 50%;
  background-color: #fff;
`

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`

interface Props {
  files: FileWithPreview[]
  children?: React.ReactNode
  attention?: boolean
}

export const Thumbs = ({ files, children, attention }: Props): JSX.Element => {
  return (
    <>
      {files.map((file) => (
        <Thumb key={file.name} data-testid='image'>
          <ThumbInner
            data-testid='thumbInner'
            style={{
              backgroundColor: attention ? '#C3CBD5' : '#fff',
            }}
          >
            {children ? (
              children
            ) : (
              <Img
                src={file.preview}
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
              />
            )}
          </ThumbInner>
        </Thumb>
      ))}
    </>
  )
}
