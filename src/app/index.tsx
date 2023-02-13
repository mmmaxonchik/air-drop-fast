import { useState } from "react"
import { Container } from "react-bootstrap"
import { Navbar } from "../widgets/Navbar"
import { AppRouter } from "./providers/router"
import "./styles/index.scss"

function App() {
  const [theme, setTheme] = useState<string>("light")
  return (
    <div className={theme === "dark" ? "App dark" : "App light"}>
      <Navbar />
      <Container>
        <AppRouter />
      </Container>
    </div>
  )
}

export default App
