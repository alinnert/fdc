import classNames from 'classnames'
import { FC } from 'react'
import { FamilyConfigItem } from '../../../global/ElementDetailResult.js'
import { Filename } from '../ui/Filename.js'
import { usePathSegments } from '../ui/usePathSegments.js'

type Props = {
  familyConfig: FamilyConfigItem
}

export const FamilyConfiguration: FC<Props> = ({ familyConfig }) => {
  const { path, filename } = usePathSegments(familyConfig.filename)

  return (
    <div className="my-2">
      <div
        className={classNames(
          'mb-1 px-4 font-mono font-semibold',
          familyConfig.familyType === 'SheetFrame'
            ? 'text-sky-700'
            : 'text-teal-700',
        )}
      >
        <div className="flex items-center">
          <div className="font-sans">{familyConfig.familyType}</div>

          {familyConfig.familyType === 'SheetFrame' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : null}
        </div>

        <div className="font-normal text-black">{familyConfig.selector}</div>
      </div>

      <div className="col-start-1 col-end-3 px-4 pb-2 text-sm">
        <Filename
          path={path}
          filename={filename}
          lineNumber={familyConfig.line}
        />
      </div>
    </div>
  )
}
