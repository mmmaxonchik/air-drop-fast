import { useState } from "react"
import { Container } from "react-bootstrap"
import { Footer } from "../entities/Footer"
import { Navbar } from "../widgets/Navbar"
import { AppRouter } from "./providers/router"
import "./styles/index.scss"

function App() {
  const [theme, setTheme] = useState<string>("light")
  return (
    <div className={theme === "dark" ? "App dark" : "App light"}>
      <Navbar />
      <Container className="container">
        <AppRouter />
      </Container>
      <Footer />
    </div>
  )
}

export default App
