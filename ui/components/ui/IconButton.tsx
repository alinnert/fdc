import classNames from 'classnames'
import { FC, ReactNode } from 'react'

interface Props {
  icon: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const IconButton: FC<Props> = ({ icon, disabled, onClick }) => {
  return (
    <button
      className={classNames(
        'grid items-center justify-center',
        'cursor-default',
        'rounded',
        'p-1',
        'text-2xl leading-none text-neutral-600',
        'enabled:hover:bg-neutral-300',
        'enabled:active:bg-neutral-500 enabled:active:text-white',
        'disabled:opacity-30',
        'border enabled:border-neutral-300 disabled:border-transparent',
        'enabled:active:border-neutral-500',
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
