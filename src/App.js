import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components"
import {
  Homepage,
  Capsules,
  SingleLandPad,
  SingleLaunch,
  Launchpads,
  SingleLaunchPad,
  Rockets,
  SingleRocket,
  SingleShip,
} from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/capsules" element={<Capsules />}></Route>
        
        <Route path="/landpads/:id" element={<SingleLandPad />}></Route>
        
        <Route path="/launches/:id" element={<SingleLaunch />}></Route>
        <Route path="/launchpads" element={<Launchpads />}></Route>
        <Route path="/launchpads/:id" element={<SingleLaunchPad />}></Route>
        
        <Route path="/rockets" element={<Rockets />}></Route>
        <Route path="/rockets/:id" element={<SingleRocket />}></Route>
        
        <Route path="/ships/:id" element={<SingleShip />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
