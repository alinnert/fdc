import { FC, Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { ElementDetailData } from '../components/elementDetail/ElementDetailData'
import { ElementDetailTitle } from '../components/elementDetail/ElementDetailTitle'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'
import { elementNameState } from '../states/elementDetailStates'

export const ElementDetail: FC = ({}) => {
  const navigate = useNavigate()
  const params = useParams()

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
        <Suspense fallback="Loading...">
          <ElementDetailTitle />
        </Suspense>
      }
      onClose={handleClose}
    >
      <div className="grid self-stretch relative">
        <Suspense fallback="Loading...">
          <ElementDetailData />
        </Suspense>
      </div>
    </ToolbarContainer>
  )
}
