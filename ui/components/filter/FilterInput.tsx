import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  filterStringState,
  firstFilteredElementState,
} from '../../states/filterStates'

export const FilterInput: FC = () => {
  const navigate = useNavigate()
  const [value, setValue] = useRecoilState(filterStringState)
  const firstFilteredElement = useRecoilValue(firstFilteredElementState)

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
        placeholder="Filter elements..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
