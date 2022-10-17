import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ElementsList } from '../components/elements/ElementsList'

export const ElementsListLayout: FC = () => {
  return (
    <div className="grid grid-cols-[700px,1px,1fr] overflow-hidden">
      <Suspense
        fallback={<div className="py-8 text-center">Loading elements...</div>}
      >
        <ElementsList />
      </Suspense>

      <div className="h-full w-px bg-gray-200" />

      <Outlet />
    </div>
  )
}
