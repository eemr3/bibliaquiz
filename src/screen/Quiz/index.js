import { useEffect, useState } from 'react'
//import db from '../../../db.json'

import QuizBackground from '../../components/QuizBackground'
import QuizContainer from '../../components/QuizContainer'
import QuizLogo from '../../components/QuizLogo'
import Button from '../../components/Button'
import { Widget } from '../../components/Widget'
import AlternativesForm from '../../components/AlternativesForm'
import BlackLinkArrow from '../../components/BackLinkArrow'
function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  )
}

function ResultgWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Resultado</Widget.Header>
      <Widget.Content>
        <p>Você acertou {results.filter((x) => x).length} pergutas</p>
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              Resultado:
              {item === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

const QuestionWidget = ({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false)
  const questiondId = `question__${questionIndex}`
  const isCorrect = selectedAlternative === question.answer
  const hasSelectedAlternative = selectedAlternative !== undefined

  function handleSubmit(event) {
    event.preventDefault()
    setIsQuestionSubmited(true)
    setTimeout(() => {
      addResult(isCorrect)
      onSubmit()
      setIsQuestionSubmited(false)
      setSelectedAlternative(undefined)
    }, 3000)
  }

  return (
    <Widget>
      <Widget.Header>
        <BlackLinkArrow href="/" />

        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        src={question.image}
        alt="Descrção"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`

            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
            const isSelected = selectedAlternative === alternativeIndex

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  name={questiondId}
                />
                {alternative}
              </Widget.Topic>
            )
          })}
          <Button type="submit" disabled={!hasSelectedAlternative}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [results, setResults] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = externalQuestions[questionIndex]
  const totalQuestions = externalQuestions.length
  const bg = externalBg

  function addResult(result) {
    setResults([...results, result])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && (
          <ResultgWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  )
}
export default QuizPage
