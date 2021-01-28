import { useState } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'

import Footer from '../src/components/Footer'
import { Widget } from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizLogo from '../src/components/QuizLogo'
import QuizContanier from '../src/components/QuizContainer'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

import db from '../db.json'

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
        <Widget>
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
