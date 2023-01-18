import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { InitialStep } from './Initial'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Steps/InitialStep',
  component: InitialStep,
} as ComponentMeta<typeof InitialStep>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InitialStep> = (args) => {
  return <InitialStep {...args} />
}

export const Primary = Template.bind({})

Primary.args = {
  files: [],
}

export const WithFiles = Template.bind({})

WithFiles.args = {
  files: [
    Object.assign(new File([], 'test.png'), {
      preview: 'https://picsum.photos/500/500',
    }),
  ],
}
