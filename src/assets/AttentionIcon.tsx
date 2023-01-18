import React from 'react'

export const AttentionIcon = ({ style }: { style?: React.CSSProperties }): JSX.Element => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
    >
      <g clipPath='url(#clip0_1_34)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.9875 -0.0124969C4.4625 -0.0124969 -0.0124969 4.4625 -0.0124969 9.9875C-0.0124969 15.5125 4.4625 19.9875 9.9875 19.9875C15.5125 19.9875 19.9875 15.5125 19.9875 9.9875C19.9875 4.4625 15.5125 -0.0124969 9.9875 -0.0124969ZM11.2375 16.2375H8.7375V13.7375H11.2375V16.2375ZM11.2375 12.4875H8.7375V3.7375H11.2375V12.4875Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_34'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
