import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Slider } from './Slider'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = React.useState(0)
  return (
    <Slider
      {...args}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber)
      }}
      style={{
        width: '276px',
        '--min': 0,
        '--max': 100,
        '--val': value,
      }}
    />
  )
}

export const Primary = Template.bind({})

Primary.args = {}
