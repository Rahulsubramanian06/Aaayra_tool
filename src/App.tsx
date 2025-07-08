import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './_components/Login'
import { Account } from './_components/Account'
import { Home } from './_components/Home'
import NewComposition from './_components/NewComposition'
import CompositionSliders from './_components/CompositionSliders'
import SaveNewComposition from './_components/saveNewComposition'
import MyComposition from './_components/myComposition'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new_composition" element={<NewComposition />} />
          <Route path="/composition_slider" element={<CompositionSliders />} />
          <Route path="/saveNewComposition" element={<SaveNewComposition />} />
          <Route path="/myComposition" element={<MyComposition />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
