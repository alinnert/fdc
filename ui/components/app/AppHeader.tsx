import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { appDataState } from '../../states/appDataStates'

export const AppHeader: FC = () => {
  const appData = useRecoilValue(appDataState)

  return (
    <div className="flex items-baseline bg-rose-800 px-4 py-2">
      <div className="select-none text-lg font-semibold text-rose-200">
        Fonto Dev Companion
      </div>

      <div className="ml-8 font-mono text-sm text-rose-300">
        {appData.status === 'ok' ? appData.data.basePath : null}
      </div>
    </div>
  )
}
