import React, { useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ZoomImage from './ZoomImage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ZoomImage',
  component: ZoomImage,
  argTypes: {
    image: { control: 'text' },
    zoom: { control: 'number' },
  },
} as ComponentMeta<typeof ZoomImage>
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ZoomImage> = (args) => {
  const [zoom, setZoom] = React.useState(1)
  const ref = useRef<HTMLCanvasElement>(null)
  return <ZoomImage {...args} zoom={zoom} setZoom={setZoom} canvasRef={ref} />
}

export const Primary = Template.bind({})

Primary.args = {
  clamp,
  image:
    'https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
}
