import { FC, Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { ElementDetailData } from '../components/elementDetail/ElementDetailData.js'
import { ButtonRow } from '../components/ui/ButtonRow.js'
import { ElementPath } from '../components/ui/elementPath.js'
import { IconButton } from '../components/ui/IconButton.js'
import { ToolbarContainer } from '../components/ui/ToolbarContainer.js'
import { elementPathState } from '../states/elementDetailStates.js'

export const ElementDetail: FC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [elementPath, setElementPath] = useRecoilState(elementPathState)

  useEffect(() => {
    const elementPath = params['*']?.split('/') ?? []
    setElementPath(elementPath ?? null)
    return () => {
      setElementPath(null)
    }
  }, [params, setElementPath])

  function handleClose(): void {
    navigate('/')
  }

  if (elementPath === null) {
    return null
  }

  return (
    <ToolbarContainer
      title={
        <span key="element name" className="font-mono">
          <ElementPath path={elementPath} />
        </span>
      }
      secondaryContent={
        <ButtonRow>
          <IconButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            }
            onClick={handleClose}
          />
        </ButtonRow>
      }
    >
      <div className="relative grid self-stretch">
        <Suspense
          fallback={<div className="py-8 text-center">Loading data...</div>}
        >
          <ElementDetailData />
        </Suspense>
      </div>
    </ToolbarContainer>
  )
}
