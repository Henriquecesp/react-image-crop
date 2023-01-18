import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Thumbs } from './Thumbs'
import { ThumbsContainer } from './ThumbsContainer'
import { Flex } from '../Flex'
import { AttentionIcon } from '../../assets/AttentionIcon'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Thumbs',
  component: Thumbs,
  argTypes: {
    attention: { control: 'boolean' },
  },
} as ComponentMeta<typeof Thumbs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Thumbs> = (args) => {
  return (
    <ThumbsContainer>
      <Thumbs {...args} />
    </ThumbsContainer>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  files: [
    Object.assign(new File([], 'file1'), {
      preview:
        'https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
    }),
  ],
}

export const WithChildren = Template.bind({})

WithChildren.args = {
  files: [
    Object.assign(new File([], 'file1'), {
      preview:
        'https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
    }),
  ],
  attention: true,
  children: (
    <Flex
      style={{
        width: '114px',
        height: '114px',
      }}
    >
      <AttentionIcon />
    </Flex>
  ),
}
