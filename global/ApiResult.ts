import { AppDataResult } from './AppDataResult.js'
import { ElementDetailResult } from './ElementDetailResult.js'
import { ElementsResult } from './ElementsResult.js'

export type ApiSuccessResult<Data> = {
  status: 'ok'
  data: Data
}

export type ApiErrorResult = {
  status: 'error'
  error: string
}

export type ApiResult<Data> = ApiSuccessResult<Data> | ApiErrorResult

export type AppDataApiResult = ApiResult<AppDataResult>
export type ElementsApiResult = ApiResult<ElementsResult>
export type ElementDetailApiResult = ApiResult<ElementDetailResult>
