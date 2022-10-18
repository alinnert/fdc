import { FC, Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ElementDetailData } from '../components/elementDetail/ElementDetailData'
import { IconButton } from '../components/ui/IconButton'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'
import { elementNameState } from '../states/elementDetailStates'

export const ElementDetail: FC = ({}) => {
  const navigate = useNavigate()
  const params = useParams()

  const elementName = useRecoilValue(elementNameState)
  const setElementName = useSetRecoilState(elementNameState)

  useEffect(() => {
    setElementName(params.elementName ?? null)

    return () => {
      setElementName(null)
    }
  }, [params.elementName, setElementName])

  function handleClose(): void {
    navigate('/')
  }

  return (
    <ToolbarContainer
      title={
        <span key="element name" className="font-mono">
          &lt;{elementName ?? '-'}&gt;
        </span>
      }
      secondaryContent={
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
