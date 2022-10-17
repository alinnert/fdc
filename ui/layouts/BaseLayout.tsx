import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/app/AppHeader'
import { ElementsList } from '../components/elements/ElementsList'
import { EmptyIndicator } from '../components/ui/EmptyIndicator'

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
