import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { appDataState } from '../../states/appDataStates.js'

export const AppHeader: FC = () => {
  const appData = useRecoilValue(appDataState)

  return (
    <div className="titlebar app-drag flex items-center bg-brand-800 px-4 py-2">
      <div className="select-none font-semibold text-brand-200">
        Fonto Dev Companion
      </div>

      <div className="app-no-drag ml-8 font-mono text-sm text-brand-300">
        {appData.status === 'ok' ? appData.data.basePath : null}
      </div>
    </div>
  )
}
