// @flow

import React from "react"

function Secs({ gameOver }: { gameOver: boolean }) {
  const [secs, setSecs] = React.useState(0)
  const id = React.useRef<any>(null)

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setSecs((secs) => secs + 1)
    }, 1000)
    return () => window.clearInterval(id.current)
  }, [])

  React.useEffect(() => {
    if (gameOver) {
      window.clearInterval(id.current)
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
