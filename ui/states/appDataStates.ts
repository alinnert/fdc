import { selector } from 'recoil'
import { AppDataApiResult } from '../../global/ApiResult.js'
import { endpoint } from '../lib/api.js'

export const appDataState = selector<AppDataApiResult>({
  key: 'app-data',
  async get() {
    const result = await fetch(endpoint('api/appdata'))
    return await result.json()
  },
})
