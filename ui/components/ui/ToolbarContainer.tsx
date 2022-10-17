import { FC, PropsWithChildren, ReactNode } from 'react'

interface Props {
  title?: ReactNode
  secondaryContent?: ReactNode
}

export const ToolbarContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  secondaryContent,
}) => {
  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden">
      <div className="grid grid-cols-[1fr,auto] items-center border-b border-gray-300 px-4 py-2">
        {title !== undefined ? (
          <div className="text-lg font-semibold">{title}</div>
        ) : null}

        {secondaryContent !== undefined ? (
          <div className="">{secondaryContent}</div>
        ) : null}
      </div>

      <div className="grid overflow-auto">{children}</div>
    </div>
  )
}
