import { useState } from 'react'
import './App.css'
import { CreateForm } from './components/CreateForm'
import { HomePage } from './pages/HomePage'
import { FormDetailPage } from './pages/FormDetailPage'
import { EditFormPage } from './pages/EditFormPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/form/:id" element={<FormDetailPage />} />
        <Route path="/form/:id/edit" element={<EditFormPage />} />
      </Routes>
    </Router>
  )
}

export default App
