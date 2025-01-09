import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/Recipe' element={<RecipePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
