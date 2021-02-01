import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screen/Quiz'
export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  const [projeto, usuario] = context.query.id.split('___')
  const dbExterno = await fetch(
    `https://${projeto}.${usuario}.vercel.app/api/db`
  )
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Falha na requisição dos dados!')
    })
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(err)
    })

  console.log(dbExterno)
  return {
    props: {
      dbExterno,
    },
  }
}
