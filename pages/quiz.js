import { useEffect, useState } from 'react'
import db from '../db.json'

import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Button from '../src/components/Button'
import { Widget } from '../src/components/Widget'

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  )
}

const QuestionWidget = ({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
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
      onSubmit()
      setIsQuestionSubmited(false)
      setSelectedAlternative(undefined)
    }, 3000)
  }

  return (
    <Widget>
      <Widget.Header>
        {/* <BlackLinkArrow href='/' /> */}

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
        <form onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
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
        </form>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const totalQuestions = db.questions.length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]

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
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && (
          <div>Você acertou X questões. Parabéns!</div>
        )}
      </QuizContainer>
    </QuizBackground>
  )
}
export default QuizPage
