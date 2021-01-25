import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
    &:hover,
    &:focus {
      opacity: 0.5;
    }
    span {
      text-decoration: underline;
    }
  }
`

export default function Footer(props) {
  return (
    <FooterWrapper>
      <a href="https://www.alura.com.br">
        <img
          src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg"
          alt="Logo da Alura"
        />
      </a>
      <p>
        Orgulhosamente criado durante
        {' 25/01/2021 '}a{' 29/01/2021 '}
        <a href="https://www.alura.com.br/">
          <span>Imersão React da Alura</span>
        </a>
      </p>
    </FooterWrapper>
  )
}
