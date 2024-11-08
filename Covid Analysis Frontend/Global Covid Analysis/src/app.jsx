import { Routes, Route } from "react-router-dom"
import Home from "./pages/home.jsx"
import AnalysisTool from "./pages/analysis.jsx"

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/analysis-tool" element={<AnalysisTool />}></Route>
    </Routes>
  )
}

export default App
