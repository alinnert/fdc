import { FC, Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { ElementDetailData } from '../components/elementDetail/ElementDetailData'
import { ElementDetailTitle } from '../components/elementDetail/ElementDetailTitle'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'
import { elementNameState } from '../states/elementDetailStates'

export const ElementDetail: FC = ({}) => {
  const params = useParams()

  const setElementName = useSetRecoilState(elementNameState)

  useEffect(() => {
    setElementName(params.elementName ?? null)

    return () => {
      setElementName(null)
    }
  }, [params.elementName, setElementName])

  return (
    <ToolbarContainer
      title={
        <Suspense fallback="Loading...">
          <ElementDetailTitle />
        </Suspense>
      }
    >
      <div className="grid self-stretch relative">
        <Suspense fallback="Loading...">
          <ElementDetailData />
        </Suspense>
      </div>
    </ToolbarContainer>
  )
}
