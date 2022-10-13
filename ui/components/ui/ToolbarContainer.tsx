import { FC, ReactNode } from 'react'

interface Props {
  title?: ReactNode
}

export const ToolbarContainer: FC<Props> = ({ children, title }) => {
  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden">
      <div>
        {title !== undefined ? (
          <div className="p-4 text-lg font-semibold">{title}</div>
        ) : null}
      </div>

      <div className="grid overflow-auto">{children}</div>
    </div>
  )
}
