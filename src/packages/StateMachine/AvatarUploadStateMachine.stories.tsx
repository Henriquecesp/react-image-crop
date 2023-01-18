import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AvatarUploadStateMachine } from '.'
import { FileWithPreview } from '../../types/Files'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Packages/AvatarUploadStateMachine',
  component: AvatarUploadStateMachine,
} as ComponentMeta<typeof AvatarUploadStateMachine>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarUploadStateMachine> = (args) => {
  const [files, setFiles] = React.useState<FileWithPreview[]>([])

  return <AvatarUploadStateMachine {...args} files={files} setFiles={setFiles} />
}

export const Primary = Template.bind({})

Primary.args = {}
