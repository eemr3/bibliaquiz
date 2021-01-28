import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = styled.button`
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;

  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: 0.3s;

  ${(props) =>
    props.disabled
      ? css`
          background: gray;
          cursor: default;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.secondary};
          &:hover,
          &:hover {
            opacity: 0.5;
          }
        `};
`

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
}

export default Button
