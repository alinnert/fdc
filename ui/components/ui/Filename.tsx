import classNames from 'classnames'
import { FC } from 'react'

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
  return (
    <div className="font-mono">
      <div className="mb-1 text-xs text-gray-600">{path}</div>
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
