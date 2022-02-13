import { FC, Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { ElementDetailData } from '../components/elementDetail/ElementDetailData'
import { Card } from '../components/ui/Card'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'
import { elementNameState } from '../states/elementDetailStates'

export const ElementDetail: FC = ({}) => {
  const params = useParams()

  const [elementName, setElementName] = useRecoilState(elementNameState)

  useEffect(() => {
    setElementName(params.elementName ?? null)

    return () => {
      setElementName(null)
    }
  }, [params.elementName, setElementName])

  return (
    <ToolbarContainer title={`<${elementName}>`}>
      <div className="grid self-stretch p-4">
        <Card>
          <Suspense fallback={<div>Loading...</div>}>
            <ElementDetailData />
          </Suspense>
        </Card>
      </div>
    </ToolbarContainer>
  )
}
