import styled from 'styled-components'

import db from '../db.json'

import QuizBackground from '../src/components/QuizBackground'
import { Widget } from '../src/components/Widget'
import ButtonQuiz from '../src/components/ButtonQuiz'

const QuizPage = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

const ContainerButton = styled.div`
  margin-top: 15px;
`

function Quiz() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizPage>
        <Widget>
          <Widget.Header>
            <h1>&lt; Pergunta 01 de 20</h1>
          </Widget.Header>
          <Widget.Content>
            <h1>Pergutan: lorem...</h1>
            <ButtonQuiz>Resposta 1</ButtonQuiz>
            <ButtonQuiz>Resposta 2</ButtonQuiz>
            <ButtonQuiz>Resposta 3</ButtonQuiz>
            <ButtonQuiz>Resposta 4</ButtonQuiz>
            <ContainerButton>
              <ButtonQuiz>Confirmar</ButtonQuiz>
            </ContainerButton>
          </Widget.Content>
        </Widget>
      </QuizPage>
    </QuizBackground>
  )
}
export default Quiz
