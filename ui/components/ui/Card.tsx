import { FC, PropsWithChildren, ReactElement } from 'react'

type Props = {
  className?: string
  title?: string
  titleIcon?: ReactElement
}

export const Card: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  title,
  titleIcon,
}) => {
  return (
    <div className={`rounded-md bg-white shadow-md ${className ?? ''}`}>
      {title !== undefined ? (
        <div className="flex items-center px-4 pt-4 pb-2 font-bold">
          {titleIcon !== undefined ? (
            <div className="mr-1 text-gray-500">{titleIcon}</div>
          ) : null}
          {title}
        </div>
      ) : null}

      {children}
    </div>
  )
}
