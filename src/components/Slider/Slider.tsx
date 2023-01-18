import React, { forwardRef } from 'react'
import styled, { css } from 'styled-components'

const trackH = '0.125rem'
const thumbD = '0.75rem'
const trackC = '#B9D1FF'
const filllC = '#3F80FF'

const track = css`
  box-sizing: border-box;
  border: none;
  height: 2px;
  background: ${trackC};
  border-radius: 8px;
`

const trackFill = css`
  ${track};
  height: 2px;
  background-color: transparent;
  background-image: linear-gradient(${filllC}, ${filllC}), linear-gradient(${trackC}, ${trackC});
  background-size: var(--sx) 6px, calc(100% - var(--sx)) 4px;
  background-position: left center, right center;
  background-repeat: no-repeat;
`

const fill = css`
  height: ${trackH};
  background: ${filllC};
  border-radius: 4px;
`

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbD};
  height: ${thumbD};
  border-radius: 50%;
  background: ${filllC};
`

const Input = styled.input<{ width?: string }>`
  width: ${({ width }) => width || '100%'};

  @media (max-width: 768px) {
    width: 100%;
  }

  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-moz-range-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-ms-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(0.5 * ${thumbD} + var(--ratio) * (100% - ${thumbD}));

  margin: 0;
  padding: 0;
  height: ${thumbD};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${trackH} - ${thumbD}));
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`

interface Props {
  onInput?: React.FormEventHandler<HTMLInputElement>
  style:
    | (React.CSSProperties & {
        '--min': number
        '--max': number
        '--val': number
      })
    | undefined
  width?: string
}

export const Slider = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <Input ref={ref} type='range' {...props} />
})
