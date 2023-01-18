import React from 'react'
import styled, { css } from 'styled-components'

const theme = {
  colors: {
    white: '#fff',
    dark: '#495567',
    gray: '#677489',
    error: '#C64D32',
  },
  sizes: {
    small: '0.875rem',
    medium: '1rem',
  },
}

export type TextProps = {
  color?: keyof typeof theme.colors
  size?: keyof typeof theme.sizes
  fontWeight?: 400 | 500
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span'
  lineHeight?: string
}

export const Typography = styled('h1').attrs<TextProps>(({ level }) => ({
  as: level,
}))<TextProps>`
  ${({ color = 'white', size = 'medium', fontWeight = 400 }) => css`
    font-size: ${theme.sizes[size]};
    color: ${theme.colors[color]};
    font-weight: ${fontWeight};
    line-height: 180%;
    font-family: 'Inter', sans-serif;
    font-style: normal;
  `}
`
