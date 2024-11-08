import { useState } from 'react'
import './App.css'
import { CreateForm } from './components/CreateForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <CreateForm/>
    </>
  )
}

export default App
