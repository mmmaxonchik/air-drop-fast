import { useEffect, useState } from "react"
import {
  Container,
  Navbar as BootNav,
  ButtonGroup,
  Button,
  Nav,
} from "react-bootstrap"
import { Link } from "react-router-dom"

import Logo from "./static/Logo.svg"
import Basket from "./static/Basket.svg"
import Info from "./static/Info.svg"
import Track from "./static/Track.svg"

import style from "./navbar.module.scss"

function Navbar() {
  const [nav, setNav] = useState(window.innerWidth >= 420 ? "table" : "mobile")
  const resizeComp = () => {
    window.innerWidth >= 420 ? setNav("table") : setNav("mobile")
  }
  useEffect(() => {
    window.addEventListener("resize", resizeComp)
    return () => {
      window.removeEventListener("resize", () => console.log(window.innerWidth))
    }
  }, [])
  return (
    <>
      {nav === "mobile" ? (
        <nav className={style.navMobile}>
          <BootNav
            fixed="top"
            className={style.navPhoneTop}
            bg="light"
            variant="light"
          >
            <Container className={style.container}>
              <BootNav.Brand className={style.navBrand}>
                <img
                  className={style.brandLogo}
                  height="40"
                  alt="Logo"
                  src={Logo}
                ></img>
              </BootNav.Brand>
            </Container>
          </BootNav>
          <BootNav
            fixed="bottom"
            className={style.navPhoneBottom}
            bg="light"
            variant="light"
          >
            <Container className={style.container}>
              <ButtonGroup className={style.buttonGroup} size="lg">
                {[
                  { href: "/", icon: Basket },
                  { href: "/track", icon: Track },
                  { href: "/info", icon: Info },
                ].map((btn, index) => (
                  <Button
                    key={index}
                    href={btn.href}
                    className={style.buttonNav}
                  >
                    <img alt="btnIcon" height="30" src={btn.icon}></img>
                  </Button>
                ))}
              </ButtonGroup>
            </Container>
          </BootNav>
        </nav>
      ) : null}
      {nav === "table" ? (
        <nav className={style.navTable}>
          <BootNav bg="light" expand="lg">
            <Container>
              <BootNav.Brand href="/">
                <img height="40" alt="Logo" src={Logo}></img>
              </BootNav.Brand>
              <BootNav.Toggle />
              <BootNav.Collapse className="justify-content-end">
                <Nav>
                  <Link to={"/"} className={style.navA}>
                    Заказать
                  </Link>
                  <Link to={"/track"} className={style.navA}>
                    Отследить заказ
                  </Link>
                  <Link to={"/info"} className={style.navA}>
                    Информация
                  </Link>
                </Nav>
              </BootNav.Collapse>
            </Container>
          </BootNav>
        </nav>
      ) : null}
    </>
  )
}

export default Navbar
