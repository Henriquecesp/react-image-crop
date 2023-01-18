import React from 'react'
import { AttentionIcon } from '../../../assets/AttentionIcon'
import { Container } from '../../../components/AvatarUploadContainer'
import { Flex } from '../../../components/Flex'
import { Thumbs } from '../../../components/Thumbs/Thumbs'
import { Typography } from '../../../components/Typography'
import { StepsProps } from '../../../types/StepsProps'

export const ErrorStep = ({ sendEvent }: StepsProps): JSX.Element => {
  return (
    <Container>
      <Flex
        style={{
          gap: 32,
        }}
      >
        <Thumbs
          attention
          files={[
            Object.assign(new File([], 'error'), {
              preview: '',
            }),
          ]}
        >
          <Flex
            style={{
              width: '114px',
              height: '114px',
            }}
          >
            <AttentionIcon />
          </Flex>
        </Thumbs>
        <Flex direction='column' alignItems='flex-start' justifyContent='flex-start'>
          <Typography
            level='span'
            color='error'
            size='medium'
            style={{
              letterSpacing: '-0.02em',
              marginTop: 16,
            }}
          >
            Sorry, the upload failed.
          </Typography>
          <Typography
            level='span'
            color='gray'
            size='medium'
            fontWeight={500}
            style={{
              letterSpacing: '-0.02em',
              marginTop: 16,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              sendEvent?.('RESET')
            }}
            data-testid='tryAgain'
          >
            Try Again.
          </Typography>
        </Flex>
      </Flex>
    </Container>
  )
}
