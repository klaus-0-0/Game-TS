import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Diamond from "./game/stake/Diamond"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={< Home/>} />
        <Route path="/" element={< Signup/>} />
        <Route path="signup" element={< Signup/>} />
        <Route path="login" element={< Login/>} />

        <Route path="diamond" element={< Diamond/>} />
      </Routes>
    </Router>
  )
}

export default App
