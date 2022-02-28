import { FC } from 'react'

type Props = {
  className?: string
}

export const Card: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`rounded-md bg-white shadow-md ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
