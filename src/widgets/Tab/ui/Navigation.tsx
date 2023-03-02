import { useEffect, memo, useState } from "react"
import { Dropdown, NavDropdown } from "react-bootstrap"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import style from "./tab.module.scss"

enum version {
  PC,
  Mobile,
}

enum ENavigation {
  AboutUs = "О нас",
  Contacts = "Контакты",
  Feedback = "Отзывы",
  Delivery = "Доставка",
  Pay = "Оплата",
  Instruction = "Инструкция",
}

const MobileNav = memo(() => {
  const [title, setTitle] = useState<ENavigation>(ENavigation.AboutUs)
  return (
    <NavDropdown title={title} className={style.MobileNav} drop="down-centered">
      {[
        ENavigation.AboutUs,
        ENavigation.Contacts,
        ENavigation.Feedback,
        ENavigation.Delivery,
        ENavigation.Pay,
        ENavigation.Instruction,
      ].map((text, index) => (
        <NavDropdown.Item
          onClick={() => setTitle(text)}
          eventKey={index}
          key={index}
        >
          {text}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  )
})

const PCNav = memo(() => {
  return (
    <Col sm={3}>
      <Nav variant="pills" className={style.nav}>
        {[
          ENavigation.AboutUs,
          ENavigation.Contacts,
          ENavigation.Feedback,
          ENavigation.Delivery,
          ENavigation.Pay,
          ENavigation.Instruction,
        ].map((text, index) => (
          <Nav.Item key={index} className="mb-1">
            <Nav.Link eventKey={index}>{text}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  )
})

export function Navigation() {
  const [finalVersion, setFinalVersion] = useState<version>(version.Mobile)

  const resizeFunction = (width: number) => {
    if (window.innerWidth <= 575) {
      setFinalVersion(version.Mobile)
    } else {
      setFinalVersion(version.PC)
    }
  }

  useEffect(() => {
    if (window.innerWidth <= 575) {
      setFinalVersion(version.Mobile)
    } else {
      setFinalVersion(version.PC)
    }
    window.addEventListener("resize", () => {
      const width: number = window.innerWidth
      resizeFunction(width)
    })
    return window.removeEventListener("resize", () => {
      const width: number = window.innerWidth
      resizeFunction(width)
    })
  }, [])
  return (
    <>
      {version.Mobile === finalVersion ? <MobileNav /> : null}
      {version.PC === finalVersion ? <PCNav /> : null}
    </>
  )
}
