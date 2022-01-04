import styled from "styled-components"
import { FaWindowClose } from "react-icons/fa"

const StyledEndGame = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding-top: 25vh;
  overflow: auto;
  background-color: rgba(46, 61, 73, 0.4);
  .message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    width: 80%;
    @media (max-width: 500px) {
      width: 98%;
    }
    margin: auto;
    padding: 0.5em;
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 0.6);
  }
`

const StyledFaWindowClose = styled(FaWindowClose)`
  :hover {
    color: red;
  }
`

type Props = {
  dispatch: Function
}

function EndGame({ dispatch }: Props) {
  return (
    <StyledEndGame>
      <div className="message">
        <span>End of Game </span>
        <span>
          <StyledFaWindowClose
            size={"48px"}
            onClick={() => dispatch({ type: "reset" })}
          />
        </span>
      </div>
    </StyledEndGame>
  )
}

export default EndGame
