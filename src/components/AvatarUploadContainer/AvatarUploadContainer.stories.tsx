import React, { useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Container } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AvatarUploadContainer',
  component: Container,
  argTypes: {
    isDragAccept: { control: 'boolean' },
    isDragReject: { control: 'boolean' },
    isFocused: { control: 'boolean' },
  },
} as ComponentMeta<typeof Container>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Container> = (args) => {
  return <Container {...args} />
}

export const Primary = Template.bind({})

Primary.args = {}
