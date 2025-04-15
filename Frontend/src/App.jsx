import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '../components/button.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <h1>Doctor Appointments</h1>
      <nav>
        <a href="/">Home</a> 
        <a href="/appointments">Appointments</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>


      <Button />

      Hello
    </>
  )
}

export default App
