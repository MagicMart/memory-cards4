import React from "react"
import styled from "styled-components"

import Card from "./Card"
import ScorePanel from "./ScorePanel"
import EndGame from "./EndGame"

interface State {
  icons: string[]
  opened: number[]
  matched: string[]
  moves: number
}

type Action =
  | { type: "open"; payload: { index: number } }
  | { type: "close" }
  | { type: "matched"; payload: string }
  | { type: "reset" }
  | { type: "icons"; payload: string[] }

// Game constants
const CARD_FLIP_DELAY_MS = 500
const TOTAL_PAIRS = 8

const iconsArr = [
  "FaBug",
  "FaBug",
  "FaCoffee",
  "FaCoffee",
  "FaUserSecret",
  "FaUserSecret",
  "FaMicrochip",
  "FaMicrochip",
  "FaBath",
  "FaBath",
  "FaFireExtinguisher",
  "FaFireExtinguisher",
  "FaKeyboard",
  "FaKeyboard",
  "FaCode",
  "FaCode",
]

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
  @media (max-width: 500px) {
    width: 100vw;
  }
  h1 {
    text-align: center;
    font-size: 1.75rem;
    margin: 0.3em 0;
  }
  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    height: 500px;
    @media (max-width: 500px) {
      height: 100vw;
    }
    padding: 1%;
    background: #03fcf0;
    border-radius: 15px;
    box-shadow: 5px 5px 5px grey;
  }
`

// Fisher-Yates shuffle algorithm for proper randomization
function shuffleArr(arr: string[]): string[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "open":
      if (state.opened.length === 2) {
        return state
      }

      return {
        ...state,
        opened: [...state.opened, action.payload.index],
        moves: state.moves === -1 ? 0 : state.moves,
      }

    case "close":
      return { ...state, opened: [], moves: state.moves + 1 }

    case "matched":
      return {
        ...state,
        matched: [...state.matched, action.payload],
      }

    case "reset":
      return {
        icons: [],
        opened: [],
        matched: [],
        moves: -1,
      }

    case "icons":
      return { ...state, icons: action.payload }
    default:
      throw new Error()
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    icons: [],
    opened: [],
    matched: [],
    moves: -1,
  })

  React.useEffect(() => {
    if (state.icons.length === 0) {
      dispatch({
        type: "icons",
        payload: shuffleArr(iconsArr),
      })
    }
  }, [state.icons])

  // Handle card matching logic when two cards are opened
  React.useEffect(() => {
    if (state.opened.length !== 2) return

    const [firstIndex, secondIndex] = state.opened
    const firstCard = state.icons[firstIndex]
    const secondCard = state.icons[secondIndex]
    const isMatch = firstCard === secondCard

    if (isMatch) {
      dispatch({ type: "matched", payload: firstCard })
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: "close" })
    }, CARD_FLIP_DELAY_MS)

    return () => clearTimeout(timeoutId)
  }, [state.opened, state.icons])
  const isGameOver = state.matched.length === TOTAL_PAIRS

  return (
    <Container>
      {isGameOver && <EndGame dispatch={dispatch} />}
      <h1>Memory Game Cards</h1>
      <ScorePanel
        moves={state.moves}
        gameOver={isGameOver}
        dispatch={dispatch}
      />
      <div className="cardContainer">
        {state.icons.map((icon, i) => (
          <Card
            iconName={icon}
            key={i + icon}
            index={i}
            dispatch={dispatch}
            open={state.opened.includes(i)}
            matched={state.matched.includes(icon)}
          />
        ))}
      </div>
    </Container>
  )
}

export default App
