import React from "react"
import { FaStar, FaRedo } from "react-icons/fa"
import styled from "styled-components"
import Secs from "./Secs"

const StyledScorePanel = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
  font-family: monospace;
  margin: 0.3em;
  padding: 0.3em;
  .number {
    color: green;
  }
`

function Stars({ moves }: { moves: number }) {
  return (
    <span>
      <span>
        <FaStar color={"gold"} />
      </span>
      <span>
        <FaStar color={moves < 20 ? "gold" : "grey"} />
      </span>
      <span>
        <FaStar color={moves < 10 ? "gold" : "grey"} />
      </span>
    </span>
  )
}

type Props = {
  moves: number
  gameOver: boolean
  dispatch: React.Dispatch<{ type: "reset" }>
}

function ScorePanel({ moves, gameOver, dispatch }: Props) {
  return (
    <StyledScorePanel>
      <Stars moves={moves} />
      <span>
        Moves{" "}
        <span className="number">
          {String(moves > -1 ? moves : 0).padStart(3, "0")}
        </span>
      </span>
      {moves > -1 ? (
        <Secs gameOver={gameOver} />
      ) : (
        <span>
          Secs <span className="number">000</span>
        </span>
      )}

      <span onClick={() => dispatch({ type: "reset" })}>
        <FaRedo />
      </span>
    </StyledScorePanel>
  )
}

export default React.memo<Props>(ScorePanel)
