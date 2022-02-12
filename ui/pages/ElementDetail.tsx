import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'

export const ElementDetail: FC = ({}) => {
  const params = useParams()

  return (
    <ToolbarContainer title={`<${params.elementName}>`}>
      <div className="p-4 grid self-stretch">
        <Card>Hi</Card>
      </div>
    </ToolbarContainer>
  )
}
