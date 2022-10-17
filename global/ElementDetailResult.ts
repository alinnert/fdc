export type FamilyConfigItem = {
  familyType: string
  selector: string
  filename: string
  line: number
}

export type InsertOperationItem = {
  operationName: string
  filename: string
  line: number
}

export type ElementDetailResult = {
  familyConfigs: FamilyConfigItem[]
  insertOperations: InsertOperationItem[]
}
