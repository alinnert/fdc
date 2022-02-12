import { FC, useMemo } from 'react'

interface Props {
  name: string
  additionalData?: string
}

export const Filename: FC<Props> = ({ name, additionalData }) => {
  const separator = useMemo(() => {
    return name.indexOf('/') !== -1 ? '/' : '\\'
  }, [name])

  const [path, filename] = useMemo<[string, string]>(() => {
    const segments = name.split(separator)
    const filename = segments.pop() ?? ''
    const path = segments.join(separator)
    return [path, filename]
  }, [name, separator])

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
