import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Diamond from "./game/stake/Diamond"
import ChipsAndBomb from "./game/rockPaperScessor/chipsAndBomb"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={< Home/>} />
        <Route path="/" element={< Signup/>} />
        <Route path="signup" element={< Signup/>} />
        <Route path="login" element={< Login/>} />

        <Route path="diamond" element={< Diamond/>} />
        <Route path="ChipsAndBomb" element={< ChipsAndBomb/>} />
      </Routes>
    </Router>
  )
}

export default App
