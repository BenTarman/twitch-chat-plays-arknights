import { useState, useEffect } from 'react'

const useCountdown = (initialCount, completionFn) => {
  const [count, setCount] = useState(initialCount)
  const [startCounter, setStartCounterOn] = useState(false)
  const [intervalId, setInveralId] = useState()

  useEffect(() => {
    if (count <= 0) {
      clearInterval(intervalId)
      completionFn()
    }
  }, [count, intervalId, completionFn])

  useEffect(() => {
    if (startCounter) {
      setInveralId(
        setInveralId(() => {
          setCount(prev => prev - 1)
        }, 1000)
      )
    }
  }, [startCounter])

  const startTimer = () => setStartCounterOn(true)

  const resetTimer = () => {
    clearInterval(intervalId)
    setCount(initialCount)
    setStartCounterOn(false)
  }

  return [count, resetTimer, startTimer]
}

export default useCountdown
