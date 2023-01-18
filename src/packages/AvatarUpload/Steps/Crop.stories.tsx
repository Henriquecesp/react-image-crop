import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CropStep } from './Crop'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Steps/CropStep',
  component: CropStep,
} as ComponentMeta<typeof CropStep>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CropStep> = (args) => {
  return <CropStep {...args} />
}

export const Primary = Template.bind({})

Primary.args = {
  files: [
    Object.assign(new File([], 'test.png'), {
      preview: 'https://picsum.photos/200/300',
    }),
  ],
}
