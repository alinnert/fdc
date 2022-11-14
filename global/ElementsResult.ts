export type ElementsResultItem = {
  elementName: string
  parents?: string[]
}

export type SearchableElementsResultItem = ElementsResultItem & {
  readonly searchString: string
}

export type ElementsResult = Record<string, ElementsResultItem[]>

export type SearchableElementsResult = Record<
  string,
  SearchableElementsResultItem[]
>
