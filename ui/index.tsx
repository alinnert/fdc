import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { App } from './App.js'

const container = document.getElementById('app')

if (container !== null) {
  render(container)
}

function render(container: HTMLElement): void {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StrictMode>,
  )
}
