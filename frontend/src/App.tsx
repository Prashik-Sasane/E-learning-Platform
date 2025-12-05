import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  {SignupForm} from './components/SignupForm'
import  {NavbarDemo}  from './components/NavbarDemo'
import Explore from './components/container/Explore'
import Problem from './components/Problem'
import Survey from './components/container/Survey'
import './App.css'
import Dashboard from './components/container/Dashboard'
import DoubtFormPage from './components/features/ai-features/DoubtFormPage'
import DoubtListPage from './pages/DoubtListPage'
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarDemo />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} /> 
        <Route path="/problems" element={<Problem />} />
        <Route path="/survey" element={<Survey />} />

        <Route path="/form" element={<DoubtFormPage />} />
        <Route path="/doubts" element={<DoubtListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
