import classNames from 'classnames'
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  filterStringState,
  firstFilteredElementState,
} from '../../states/filterStates.js'
import { IconButton } from '../ui/IconButton.js'

export const FilterInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [value, setValue] = useRecoilState(filterStringState)
  const firstFilteredElement = useRecoilValue(firstFilteredElementState)

  useEffect(() => {
    function handleKeydown(event: globalThis.KeyboardEvent): void {
      if (inputRef.current === null) return
      if (document.activeElement === inputRef.current) return
      if (event.key !== 'f') return
      inputRef.current.select()
      event.preventDefault()
    }

    addEventListener('keydown', handleKeydown)

    return () => {
      removeEventListener('keydown', handleKeydown)
    }
  }, [])

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key !== 'Enter') return
    console.log(firstFilteredElement)
    if (firstFilteredElement === null) return
    navigate(`/element/${firstFilteredElement.elementName}`)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value)
  }

  function handleClearClick(): void {
    setValue('')
  }

  return (
    <div className="flex items-center">
      <input
        className={classNames(
          'mr-1 w-80 rounded',
          'bg-white',
          'px-2 py-1',
          'text-sm text-neutral-700',
          'placeholder:text-black/50',
          'border border-neutral-300',
        )}
        type="text"
        ref={inputRef}
        placeholder="Filter elements..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        }
        onClick={handleClearClick}
        disabled={value === ''}
      />
    </div>
  )
}
