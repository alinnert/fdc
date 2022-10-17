import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { ElementDetail } from './pages/ElementDetail'
import { Index } from './pages/Index'

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/element/:elementName" element={<ElementDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
