import React from 'react'

interface Props {
  children?: React.ReactNode
}

export const AvatarUpload = (props: Props): JSX.Element => {
  return <div>{props.children}</div>
}
