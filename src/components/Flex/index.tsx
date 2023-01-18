import styled from 'styled-components'

export const Flex = styled.div<{
  direction?: 'row' | 'column'
  justifyContent?: 'center' | 'space-between' | 'flex-start' | 'flex-end'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justifyContent = 'center' }) => justifyContent};
  align-items: ${({ alignItems = 'center' }) => alignItems};
  gap: 8px;
`
