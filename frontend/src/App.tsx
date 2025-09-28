import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  {SignupForm} from './components/SignupForm'
import  {NavbarDemo}  from './components/NavbarDemo'
import Explore from './components/container/Explore'
import Problem from './components/Problem'
import './App.css'
import Dashboard from './components/container/Dashboard'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarDemo />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} /> 
        <Route path="/problems" element={<Problem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
