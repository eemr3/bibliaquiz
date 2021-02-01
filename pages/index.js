import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import db from '../db.json'
import Link from '../src/components/Link'
import { Widget } from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import QuizContanier from '../src/components/QuizContainer'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  function handleSumit(event) {
    event.preventDefault()
    router.push(`/quiz?name=${name}`)
  }

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContanier>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Bíblia Sagrada</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Teste os seus conhecimentos sobre a Bíblia. E veja o quanto você
              sabe.
            </p>
            <Form onSubmit={handleSumit}>
              <Input
                onChange={handleChange}
                placeholder="Diga o seu nome"
                name="nameUser"
                value={name}
                type="text"
              />
              <Button type="submit" disabled={name.length === 0}>
                Vamos começcar {name}
              </Button>
            </Form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '50%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2>Quiz da Galera</h2>
            <ul>
              {db.external.map((quizExterno) => {
                const [projeto, usuario] = quizExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')

                return (
                  <li key={quizExterno}>
                    <Widget.Topic
                      href={`/quiz/${projeto}___${usuario}`}
                      as={Link}
                    >
                      {`${projeto}/${usuario}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContanier>
      <GitHubCorner projectUrl="https://github.com/eemr3" />
    </QuizBackground>
  )
}
