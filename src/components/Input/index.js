import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
`
const Container = styled.div`
  width: 100%;
`
export default function InputBase({ onChange, placeholder, ...props }) {
  return (
    <Container>
      <Input onChange={onChange} placeholder={placeholder} {...props} />
    </Container>
  )
}

Input.defaultProps = {
  value: '',
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
