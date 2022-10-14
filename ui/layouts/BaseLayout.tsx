import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { FilterInput } from '../components/filter/FilterInput'

export const BaseLayout: FC = () => {
  return (
    <div className="fixed inset-0 grid grid-rows-[auto,1fr]">
      <div className="grid grid-cols-[1fr,auto,1fr] items-center bg-rose-800 px-4 py-2">
        <div className="select-none text-lg font-semibold text-rose-100">
          Fonto Dev Companion
        </div>

        <div>
          <Suspense fallback={<></>}>
            <FilterInput />
          </Suspense>
        </div>
      </div>

      <Outlet />
    </div>
  )
}
