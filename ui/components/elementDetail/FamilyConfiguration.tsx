import classNames from 'classnames'
import { FC } from 'react'
import { FamilyConfigItem } from '../../../global/ElementDetailResult'
import { usePathSegments } from '../ui/usePathSegments'

type Props = {
  familyConfig: FamilyConfigItem
}

export const FamilyConfiguration: FC<Props> = ({ familyConfig }) => {
  const { path, filename } = usePathSegments(familyConfig.filename)

  return (
    <div className="my-2 grid grid-cols-[1fr,3fr]">
      <div
        className={classNames(
          'flex items-center gap-x-1 px-4 font-semibold',
          familyConfig.familyType === 'SheetFrame'
            ? 'text-teal-500'
            : 'text-teal-700',
        )}
      >
        {familyConfig.familyType}
      </div>

      <div className="col-start-1 col-end-3 px-4 pb-4 text-sm">
        <div className="text-gray-600">{path}</div>
        <div>
          <span className="font-semibold">{filename}:</span>{' '}
          <span className="font-semibold text-pink-700">
            {familyConfig.line}
          </span>
        </div>
      </div>
    </div>
  )
}
