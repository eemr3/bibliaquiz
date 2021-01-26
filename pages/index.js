import Link from 'next/link'

import styled from 'styled-components'

import Footer from '../src/components/Footer'
import { Widget } from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'

import db from '../db.json'

export const QuizContanier = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`
const Button = styled.a`
  text-align: center;
  width: 250px;
  display: inline-block;
  padding: 10px;
  margin: 5px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  cursor: pointer;
`

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContanier>
        <Widget>
          <Widget.Header>
            <h1>Bíblia Sagrada</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </Widget.Content>
          <Link href="/quiz">
            <Button>Vamos começar</Button>
          </Link>
        </Widget>

        <Widget>
          <Widget.Content>
            <h2>Quiz da Galera</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContanier>
      <GitHubCorner projectUrl="https://github.com/eemr3" />
    </QuizBackground>
  )
}
