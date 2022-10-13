import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { filterStringState } from '../../states/filterStates'

export const FilterInput: FC = () => {
  const [value, setValue] = useRecoilState(filterStringState)

  return (
    <div>
      <input
        className="w-96 rounded bg-white/30 px-2 py-1 text-white mix-blend-lighten placeholder:text-white/80"
        type="text"
        placeholder="Filter elements..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  )
}
