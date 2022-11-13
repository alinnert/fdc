import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { appDataState } from '../../states/appDataStates.js'

export const AppHeader: FC = () => {
  const appData = useRecoilValue(appDataState)

  return (
    <div className="titlebar app-drag bg-brand-800 flex items-center px-4 py-2">
      <div className="text-brand-200 select-none font-semibold">
        Fonto Dev Companion
      </div>

      <div className="app-no-drag text-brand-300 ml-8 font-mono text-sm">
        {appData.status === 'ok' ? appData.data.basePath : null}
      </div>
    </div>
  )
}
