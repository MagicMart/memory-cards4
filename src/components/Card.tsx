import React from "react"
import styled, { keyframes } from "styled-components"
import {
  FaBug,
  FaCoffee,
  FaUserSecret,
  FaMicrochip,
  FaBath,
  FaFireExtinguisher,
  FaKeyboard,
  FaCode,
} from "react-icons/fa"

const iconsStore: any = {
  FaBug,
  FaCoffee,
  FaUserSecret,
  FaMicrochip,
  FaBath,
  FaFireExtinguisher,
  FaKeyboard,
  FaCode,
}

const faceUp = keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(180deg);
  }
`

const faceDown = keyframes`
  from {
    transform: rotateY(180deg);
  }

  to {
    transform: rotateY(0deg);
  }
`

interface StyledProps {
  open: boolean
  matched: boolean
}

const StyledCard = styled.div<StyledProps>`
  animation: ${(props) => (props.open ? faceUp : faceDown)} 0.5s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23%;
  height: 23%;
  background: ${(props) =>
    props.matched ? "green" : props.open ? "#02b3e4" : "#2e3d49"};
  border-radius: 15px;
  border: 1px solid grey;
  .icon {
    animation: inherit;
    color: ${(props) => (props.open || props.matched ? "#ffffff" : "#2e3d49")};
  }
`

type Props = {
  iconName: string
  index: number
  open: boolean
  matched: boolean
  dispatch: React.Dispatch<{
    type: "open"
    payload: { iconName: string; index: number }
  }>
}

function Card({ iconName, index, dispatch, open, matched }: Props) {
  const Icon = iconsStore[iconName]
  const handleDispatch = () => {
    open === false &&
      matched === false &&
      dispatch({ type: "open", payload: { iconName, index } })
  }
  return (
    <StyledCard
      open={open || matched}
      matched={matched}
      onClick={handleDispatch}
    >
      <Icon className="icon" size={"50%"} />
    </StyledCard>
  )
}

export default React.memo<Props>(Card)
