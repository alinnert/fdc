export type ElementsResultItem = {
  lineNumber: number
  elementName: string
  parents?: string[]
}

export type ElementsResult = Record<string, ElementsResultItem[]>
