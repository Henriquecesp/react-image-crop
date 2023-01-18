import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ErrorStep } from './Error'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Steps/ErrorStep',
  component: ErrorStep,
} as ComponentMeta<typeof ErrorStep>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ErrorStep> = (args) => {
  return <ErrorStep {...args} />
}

export const Primary = Template.bind({})

Primary.args = {
  files: [],
}
