import { ElementDetailResult } from './ElementDetailResult'
import { ElementsResult } from './ElementsResult'

export type ApiSuccessResult<Data> = {
  status: 'ok'
  data: Data
}

export type ApiErrorResult = {
  status: 'error'
  error: string
}

export type ApiResult<Data> = ApiSuccessResult<Data> | ApiErrorResult

export type ElementsApiResult = ApiResult<ElementsResult>
export type ElementDetailApiResult = ApiResult<ElementDetailResult>
