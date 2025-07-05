import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './_components/Login'
import { Account } from './_components/Account'
import { Home } from './_components/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
