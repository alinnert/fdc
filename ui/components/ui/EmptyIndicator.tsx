import { FC, ReactElement, ReactNode } from 'react'

interface Props {
  content?: ReactNode
  icon?: ReactElement
}

export const EmptyIndicator: FC<Props> = ({ content, icon }) => {
  return (
    <div className="grid h-full grid-rows-[1fr,auto,auto,1fr] items-center justify-center">
      <div></div>
      <div className="mb-2 flex justify-center text-neutral-400">{icon}</div>
      <div className="text-lg text-neutral-600">{content}</div>
    </div>
  )
}
