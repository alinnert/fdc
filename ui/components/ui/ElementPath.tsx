import classNames from 'classnames'
import { FC, Fragment, useMemo } from 'react'

interface Props {
  path: string[]
  color?: 'neutral-light' | 'brand-dark'
}

export const ElementPath: FC<Props> = ({ path, color = 'neutral-light' }) => {
  const parentSegmentClasses = useMemo<string>(() => {
    return classNames({
      'text-brand-300': color === 'brand-dark',
      'text-neutral-400': color === 'neutral-light',
    })
  }, [color])

  const elementSegmentClasses = useMemo<string>(() => {
    return classNames({
      'text-white': color === 'brand-dark',
      'text-black': color === 'neutral-light',
    })
  }, [color])

  const dividerClasses = useMemo(() => {
    return classNames({
      'text-brand-400': color === 'brand-dark',
      'text-neutral-300': color === 'neutral-light',
    })
  }, [color])

  return (
    <>
      {path.map((segment, index) => (
        <Fragment key={index}>
          <span
            className={
              index === path.length - 1
                ? elementSegmentClasses
                : parentSegmentClasses
            }
          >
            &lt;{segment}&gt;
          </span>

          {index < path.length - 1 ? (
            <span className={dividerClasses}> / </span>
          ) : null}
        </Fragment>
      ))}
    </>
  )
}
