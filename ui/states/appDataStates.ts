import { selector } from 'recoil'
import { AppDataApiResult } from '../../global/ApiResult'
import { endpoint } from '../lib/api'

export const appDataState = selector<AppDataApiResult>({
  key: 'app-data',
  async get() {
    const result = await fetch(endpoint('api/appdata'))
    return await result.json()
  },
})
