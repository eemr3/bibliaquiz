import { useEffect, useState } from 'react'
import Image from 'next/image'
import db from '../../db.json'
import { Lottie } from '@crello/react-lottie'

import QuizBackground from '../../src/components/QuizBackground'
import QuizContainer from '../../src/components/QuizContainer'
import QuizLogo from '../../src/components/QuizLogo'
import Button from '../../src/components/Button'
import { Widget } from '../../src/components/Widget'
import AlternativesForm from '../../src/components/AlternativesForm'
import BlackLinkArrow from '../../src/components/BackLinkArrow'
import animationData from '../../src/screen/Quiz/Lotties/loading.json'
import { useRouter } from 'next/router'

function ResultgWidget({ results }) {
  const router = useRouter()
  const { name } = router.query
  const correctsAnswers = results.filter((x) => x).length
  const score = correctsAnswers * 10

  return (
    <Widget>
      <Widget.Header>Resultado</Widget.Header>
      <Widget.Content>
        <p>
          Olá {name} você acertou {correctsAnswers} pergutas!
        </p>
        {score >= 50 ? (
          <p style={{ fontSize: '18px' }}>Você fez {score} pontos, parabéns!</p>
        ) : (
          <p style={{ fontSize: '18px' }}>
            Oh não, você fez {score} pontos, tente novamente e melhore o seu
            resultado!
          </p>
        )}
      </Widget.Content>
    </Widget>
  )
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{
            animationData: animationData,
            loop: true,
            autoplay: true,
          }}
        />
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
          {isQuestionSubmited && isCorrect && (
            <p style={{ textAlign: 'center' }}>
              <Image
                src="/correct.svg"
                alt="Imagem de acertou"
                width={43}
                height={43}
              />
            </p>
          )}
          {isQuestionSubmited && !isCorrect && (
            <p style={{ textAlign: 'center' }}>
              <Image
                src="/error.svg"
                width={43}
                height={43}
                alt="Imagem de erro"
              />
            </p>
          )}
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

function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [results, setResults] = useState([])
  const totalQuestions = db.questions.length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]

  function addResult(result) {
    setResults([...results, result])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 4000)
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
