import { ApiErrorResult, ApiSuccessResult } from '../../global/ApiResult'

export function apiSuccessResult<Data>(data: Data): ApiSuccessResult<Data> {
  return { status: 'ok', data }
}

export function apiErrorResult(error: string): ApiErrorResult {
  return { status: 'error', error }
}
