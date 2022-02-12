import { StrictMode } from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { App } from './App'

console.log(import.meta.env.MODE)

render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('app'),
)
