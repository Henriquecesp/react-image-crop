import styled from 'styled-components'
interface DropZoneProps {
  isDragAccept?: boolean
  isDragReject?: boolean
  isFocused?: boolean
}

const getColor = (props: DropZoneProps) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isFocused) {
    return '#2196f3'
  }
  return '#C7CDD3'
}

export const Container = styled.div<DropZoneProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 32px;
  border-width: 2px;
  border-radius: 8px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #f2f5f8;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  height: 115px;
  width: 550px;

  @media (max-width: 768px) {
    width: 100%;
  }
`
