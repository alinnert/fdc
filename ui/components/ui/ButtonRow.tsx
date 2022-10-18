import { FC, PropsWithChildren } from 'react'

export const ButtonRow: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex items-center gap-x-1">{children}</div>
}
