import { FC } from 'react'

export const Card: FC = ({ children }) => {
  return (
    <div className="relative rounded-md bg-white shadow-md">{children}</div>
  )
}
