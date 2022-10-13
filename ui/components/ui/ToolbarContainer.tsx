import { FC, PropsWithChildren, ReactNode } from 'react'

interface Props {
  title?: ReactNode
  onClose?: () => void
}

export const ToolbarContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  onClose,
}) => {
  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden">
      <div className="grid grid-cols-[1fr,auto] items-center pr-4">
        {title !== undefined ? (
          <div className="p-4 text-lg font-semibold">{title}</div>
        ) : null}

        {onClose !== undefined ? (
          <div
            onClick={onClose}
            className="grid h-8 w-8 cursor-default items-center justify-center rounded-md border border-gray-300 text-2xl leading-none text-gray-600 hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </div>
        ) : null}
      </div>

      <div className="grid overflow-auto">{children}</div>
    </div>
  )
}
