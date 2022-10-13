import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  filterStringState,
  firstFilteredElementState,
} from '../../states/filterStates'

export const FilterInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [value, setValue] = useRecoilState(filterStringState)
  const firstFilteredElement = useRecoilValue(firstFilteredElementState)

  useEffect(() => {
    const handleKeydown = (event: globalThis.KeyboardEvent): void => {
      if (inputRef.current === null) return
      if (document.activeElement === inputRef.current) return
      if (event.key !== 'f') return
      inputRef.current.focus()
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

  return (
    <div>
      <input
        className="w-96 rounded bg-white/30 px-2 py-1 text-white mix-blend-lighten placeholder:text-white/80"
        type="text"
        ref={inputRef}
        placeholder="Filter elements..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
