import styled from 'styled-components'

const Button = styled.button`
  width: 100%;
  display: inline-block;
  padding: 10px;
  margin: 5px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  color: white;
  font-size: 15px;
  cursor: pointer;
`

const ButtonQuiz = ({ children }) => {
  return <Button>{children}</Button>
}

export default ButtonQuiz
