import React from "react"

function Secs({ gameOver }: { gameOver: boolean }) {
  const [secs, setSecs] = React.useState(0)
  const intervalId = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    // Don't start a new interval if game is already over
    if (gameOver) return

    intervalId.current = setInterval(() => {
      setSecs((prevSecs) => prevSecs + 1)
    }, 1000)

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
    }
  }, [gameOver])

  return (
    <span>
      {" "}
      Secs <span className="number">{String(secs).padStart(3, "0")}</span>
    </span>
  )
}

type Props = {
  gameOver: boolean
}

export default React.memo<Props>(Secs)
