import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/app/AppHeader.js'
import { ElementsList } from '../components/elements/ElementsList.js'
import { EmptyIndicator } from '../components/ui/EmptyIndicator.js'

export const BaseLayout: FC = () => {
  return (
    <div className="fixed inset-0 grid grid-rows-[auto,1fr]">
      <Suspense>
        <AppHeader />
      </Suspense>

      <div className="grid grid-cols-[700px,1px,1fr] overflow-hidden">
        <Suspense fallback={<EmptyIndicator content="Loading elements..." />}>
          <ElementsList />
        </Suspense>

        <div className="h-full w-px bg-gray-300" />

        <Outlet />
      </div>
    </div>
  )
}
