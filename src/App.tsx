import { BrowserRouter , Routes , Route } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Login/>} />
          <Route path="/Register" element = {<Register/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
