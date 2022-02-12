import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { FilterInput } from '../components/filter/FilterInput'

export const BaseLayout: FC = () => {
  return (
    <div className="fixed inset-0 grid grid-rows-[auto,1fr]">
      <div className="grid grid-cols-[1fr,auto] items-center bg-gradient-to-r from-pink-900 to-rose-700 px-4 py-4 shadow-lg">
        <div className="text-xl font-semibold text-white">
          Fonto Development Tools Helpers
        </div>

        <div>
          <FilterInput />
        </div>
      </div>

      <Outlet />
    </div>
  )
}
