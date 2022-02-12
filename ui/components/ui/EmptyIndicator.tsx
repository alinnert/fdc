import { FC } from 'react'

interface Props {
  text: string
}

export const EmptyIndicator: FC<Props> = ({ text }) => {
  return <div className="grid h-full items-center justify-center">{text}</div>
}
