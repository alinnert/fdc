import { FC, Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ElementDetailData } from '../components/elementDetail/ElementDetailData'
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
        <span key="element name" className="">
          &lt;{elementName ?? '-'}&gt;
        </span>
      }
      onClose={handleClose}
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
