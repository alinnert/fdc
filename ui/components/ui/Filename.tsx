import classNames from 'classnames'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { appDataState } from '../../states/appDataStates'

interface Props {
  path: string
  filename: string
  lineNumber?: number
  highlight?: boolean
  additionalData?: string
}

export const Filename: FC<Props> = ({
  path,
  filename,
  lineNumber,
  highlight = false,
  additionalData,
}) => {
  const appData = useRecoilValue(appDataState)

  return (
    <div className="font-mono">
      <div className="mb-1 flex items-center text-xs text-gray-600">
        {appData.status === 'ok' ? (
          <>
            <div title={appData.data.basePath} className="mr-1 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
              </svg>
            </div>
            {path.replace(appData.data.basePath, '')}
          </>
        ) : null}
      </div>
      <div className="grid grid-cols-[1fr,auto] items-center">
        <div>
          <span
            className={classNames('font-semibold', {
              'text-rose-700': highlight,
              'text-sm': !highlight,
            })}
          >
            {filename}
          </span>

          {lineNumber !== undefined ? (
            <span className="font-semibold text-gray-400">:{lineNumber}</span>
          ) : null}
        </div>

        {additionalData !== undefined ? (
          <div className="font-sans text-sm font-semibold">
            {additionalData}
          </div>
        ) : null}
      </div>
    </div>
  )
}
