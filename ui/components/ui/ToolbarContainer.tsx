import { FC } from 'react'

interface Props {
  title?: string
}

export const ToolbarContainer: FC<Props> = ({ children, title }) => {
  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden">
      <div>
        {title !== undefined ? (
          <div className="px-8 py-4 text-lg font-semibold">{title}</div>
        ) : null}
      </div>

      <div className="overflow-auto grid">{children}</div>
    </div>
  )
}