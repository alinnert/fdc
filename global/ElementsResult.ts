export type ElementsResultItem = {
  elementName: string
  parents?: string[]
}

export type ElementsResult = Record<string, ElementsResultItem[]>
