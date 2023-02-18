import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import style from "./tab.module.scss"

export function Navigation() {
  return (
    <Col sm={3}>
      <Nav variant="pills" className={style.nav}>
        {[
          "О нас",
          "Контакты",
          "Отзывы",
          "Доставка",
          "Оплата",
          "Инструкция",
        ].map((text, index) => (
          <Nav.Item key={index} className="mb-1">
            <Nav.Link eventKey={index}>{text}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  )
}
