import { FC } from 'react'
import { usePathSegments } from './usePathSegments'

interface Props {
  name: string
  additionalData?: string
}

export const Filename: FC<Props> = ({ name, additionalData }) => {
  const { path, filename } = usePathSegments(name)

  return (
    <>
      <div className="mb-2 text-sm font-semibold text-gray-500">{path}</div>

      <div className="grid grid-cols-[1fr,auto]">
        <div className="font-bold text-pink-700">{filename}</div>

        {additionalData !== undefined ? (
          <div className="font-semibold text-gray-600">{additionalData}</div>
        ) : null}
      </div>
    </>
  )
}
