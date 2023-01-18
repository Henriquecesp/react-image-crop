import styled from 'styled-components'

export const Button = styled.button<{
  icon?: boolean
}>`
  background: #3d485f;
  border-radius: 16px;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 35px;
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  line-height: 180%;
  letter-spacing: -0.02em;

  &:hover {
    background: #677489;
  }
  &:active {
    background: #3d485f;
  }

  ${({ icon }) =>
    icon &&
    `
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      padding: 4px;
      &:hover {
        background: transparent;
        background: #eee;
      }
      &:active {
        background: #ddd;
      }
    `}
`
