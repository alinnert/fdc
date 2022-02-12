import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'

export const App: FC = () => {
  const [state, setState] = useState<'init' | 'pending' | 'done' | 'error'>(
    'init',
  )
  const [text, setText] = useState<string>('')

  useEffect(() => {
    fetchData()
    async function fetchData(): Promise<void> {
      setState('pending')
      try {
        const result = await fetch(`http://localhost:4080/api`)
        const resultText = await result.text()
        setText(resultText)
        setState('done')
      } catch (error) {
        setState('error')
      }
    }
  }, [])

  return (
    <div
      className={classNames(
        'm-4',
        'shadow-md rounded',
        'p-4',
        'bg-white',
        'font-sans font-semibold text-blue-600',
      )}
    >
      <div>env: {import.meta.env.MODE}</div>
      <div>Status: {state}</div>
      <div>Result: {text}</div>
    </div>
  )
}
