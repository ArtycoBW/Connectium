import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(callback)

  // Запоминаем последний callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Устанавливаем интервал
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
