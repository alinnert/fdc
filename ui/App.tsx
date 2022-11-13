import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout.js'
import { ElementDetail } from './pages/ElementDetail.js'
import { Index } from './pages/Index.js'

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/element/*" element={<ElementDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
