import { FC } from 'react'

type Props = {
  className?: string
  title?: string
}

export const Card: FC<Props> = ({ children, className, title }) => {
  return (
    <div className={`rounded-md bg-white shadow-md ${className ?? ''}`}>
      {title !== undefined ? (
        <div className="px-4 pt-4 font-bold">{title}</div>
      ) : null}

      {children}
    </div>
  )
}
